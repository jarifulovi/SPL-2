import dotenv from 'dotenv';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import storageConfig from '../storageConfig';
import crypto from 'crypto';

dotenv.config();



const generateHash = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest('hex');
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


const uploadFile = async(file, key) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        // Use the AWS SDK directly to upload
        await storageConfig.s3Client.send(new PutObjectCommand(params));
        console.log('Upload successful');
    } catch (error) {
        throw new Error('File upload failed.');
    }
}

export default { 
    generateHash, 
    getFileUrl, 
    uploadFile 
};
