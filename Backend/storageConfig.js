import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import multerS3 from 'multer-s3';

dotenv.config();
// Storage variables

const acceptsObj = {
    image: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/x-icon"],
    audio: ["audio/mpeg", "audio/ogg", "audio/wav", "audio/webm"],
    video: ["video/mp4", "video/webm"],
    documents: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain"
    ],
    compressed: ["application/zip", "application/gzip"],
    coding: [
        "text/javascript",
        "text/html",
        "text/css",
        "application/json",
        "application/xml",
        "text/x-python",
        "text/x-java-source",
        "text/x-c",
        "text/x-c++",
        "text/x-php",
        "text/x-shellscript"
    ],
    other: ["application/octet-stream"]
  };
  
const allowedFileTypes = Object.values(acceptsObj).flat();
const fileSizeLimitInMB = 20;

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.S3_BUCKET_NAME) {
    throw new Error('Missing AWS credentials. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and S3_BUCKET_NAME environment variables.');
}

// Set up AWS SDK v3 S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


export default {
    s3Client,
    allowedFileTypes,
    fileSizeLimitInMB
};
