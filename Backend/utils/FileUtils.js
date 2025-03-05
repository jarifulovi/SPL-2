import dotenv from 'dotenv';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import storageConfig from '../storageConfig.js';
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



const getFileUrl = async (key) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        return await getSignedUrl(storageConfig.s3Client, command, { expiresIn: 3600 });
    } catch (error) {
        throw new Error('Failed to generate file URL.');
    }
};


const generateSignedUploadUrl = async (contentType, key) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        };
    
        const command = new PutObjectCommand(params);
        const signedUrl = await getSignedUrl(storageConfig.s3Client, command, { expiresIn: 120 });
        return signedUrl;
    } catch (error) {
        throw new Error("Failed to generate signed URL.");
    }
    
}


const generateProfilePicUploadUrl = async (file, key) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
    
        const command = new PutObjectCommand(params);
        await storageConfig.s3Client.send(command);
    
        // Return the public URL (it won’t expire)
        const encodedKey = encodeURI(key);
        const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodedKey}`;
        
        return { publicUrl };
    } catch (error) {
        console.log('error', error);
        throw new Error("Failed to upload profile picture to S3.");
    }
    
};


const deleteFileFromS3 = async (key) => {

    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        };
        const command = new DeleteObjectCommand(params);
        await storageConfig.s3Client.send(command);
        console.log(`Deleted: ${key}`);
    } catch (error) {
        console.error('Error deleting file:', error.message);
        throw error;
    }
};


export default { 
    generateFileHashFromPath, 
    getFileUrl, 
    generateSignedUploadUrl,
    generateProfilePicUploadUrl,
    deleteFileFromS3,
};
