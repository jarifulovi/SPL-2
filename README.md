# StudySync
# A Collaborative Group Study Platform

A simple real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO for real-time communication.

## Features
- **Real-Time Collaboration**: Chat or sync study sessions using WebSockets.
- **User Authentication**: Secure login/signup with JWT and password hashing.
- **File Uploads**: Upload study materials to AWS S3 with pre-signed URLs.
- **Responsive UI**: Built with Chakra UI for a modern, accessible design.
- **MongoDB Storage**: Persistent data storage for users and resources.
- **Personalized Group Recommendation**: Let users enter subjects or topics to get personalized group recommendations.

## Tech Stack
### Backend
- **Node.js & Express**: Server-side framework.
- **MongoDB (Mongoose)**: Database for storing user data and resources.
- **AWS S3**: Cloud storage for files.
- **Socket.io**: Real-time communication.
- **JWT & bcryptjs**: Authentication and security.
- **Dependencies**: See [backend/package.json](backend/package.json).

### Frontend
- **React**: Frontend library with Vite for fast builds.
- **Chakra UI**: Styling and component library.
- **React Router**: Client-side routing.
- **Socket.io-client**: Real-time updates.
- **Dependencies**: See [frontend/package.json](frontend/package.json).

## Project Structure
```
mern-chat/
  ├── backend/         # Node.js and Express server
  └── frontend/        # React client application
```

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following:
   ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_key
    AWS_REGION=your_aws_region
    S3_BUCKET=your_s3_bucket_name
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```