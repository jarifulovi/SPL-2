import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

dotenv.config();
// Storage variables
const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const fileSizeLimitInMB = 20;

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.S3_BUCKET_NAME) {
    throw new Error('Missing AWS credentials. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and S3_BUCKET_NAME environment variables.');
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const sanitizedFilename = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
            cb(null, `${Date.now()}-${sanitizedFilename}`);
        }
        
    }),
    limits: { fileSize: fileSizeLimitInMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = allowedFileTypes;
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`File type : ${file.mimetype} is not allowed.`));
        }
    }
});

export default {
    s3,
    upload
};
