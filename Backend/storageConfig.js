import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import multerS3 from 'multer-s3';

dotenv.config();
// Storage variables
const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
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

const upload = multer({
    storage: multerS3({
        s3: s3Client,
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


const getFileUrl = async (fileKey) => {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
    });
  
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hour validity
    return signedUrl;
};





// Debug function to test upload functionality
const debugUpload = async () => {
    try {
        // Create a test file object (dummy data)
        const testFile = {
            originalname: 'test-file.txt',
            mimetype: 'text/plain',
            buffer: Buffer.from('This is a test file for debugging purposes.')
        };

        // Simulate the upload process (you would call this within an actual request handler)
        const key = `${Date.now()}-test-file.txt`;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: testFile.buffer,
            ContentType: testFile.mimetype,
        };

        // Use the AWS SDK directly to upload
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('Upload successful:', data);
    } catch (error) {
        console.error('Error during upload:', error);
    }
};

//debugUpload(); // Call the debug function to test the setup




export default {
    s3Client,
    upload
};
