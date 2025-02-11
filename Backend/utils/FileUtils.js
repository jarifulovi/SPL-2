import dotenv from 'dotenv';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import storageConfig from '../storageConfig';
import crypto from 'crypto';
import fs from 'fs';

dotenv.config();



const generateFileHashFromPath = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex')); // Return the final hash
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};



const getFileUrl = async (fileKey) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey,
        });

        return await getSignedUrl(storageConfig.s3Client, command, { expiresIn: 3600 });
    } catch (error) {
        throw new Error('Failed to generate file URL.');
    }
};


const uploadFile = async (file, key) => {
    try {
        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: fileStream,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        await storageConfig.s3Client.send(new PutObjectCommand(params));
        console.log('Upload successful');
    } catch (error) {
        console.error('File upload failed:', error.message);
        throw new Error('File upload failed.');
    }
};

export default { 
    generateFileHashFromPath, 
    getFileUrl, 
    uploadFile 
};
