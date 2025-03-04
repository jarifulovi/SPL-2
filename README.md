# StudySync

A full-stack web application designed to help users collaborate and study together. It features real-time communication, secure user authentication, and cloud-based file storage, making it easy to sync study materials and sessions.

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
- **Dependencies**: See [Backend/package.json](Backend/package.json).

### Frontend
- **React**: Frontend library with Vite for fast builds.
- **Chakra UI**: Styling and component library.
- **React Router**: Client-side routing.
- **Socket.io-client**: Real-time updates.
- **Dependencies**: See [Frontend/package.json](Frontend/package.json).

## Project Structure
```
mern-chat/
├── Backend/                  # Node.js and Express server
│   ├── node_modules/         # Backend dependencies
│   ├── app.js                # Main Express server file
│   ├── .env                  # Environment variables (e.g., MONGO_URI, JWT_SECRET)
│   ├── package.json          # Backend package.json (provided)
│   ├── package-lock.json     # Lock file
│   ├── routes/               # API routes (e.g., auth, messages)
│   ├── models/               # Mongoose schemas (e.g., User, Message)
│   └── controllers/          # Logic for routes (e.g., chat, auth)
│
├── Frontend/                 # React client application
│   ├── node_modules/         # Frontend dependencies
│   ├── public/               # Static assets
│   │   ├── index.html        # Vite HTML entry
│   │   └── (assets)          # e.g., favicon, images
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-based components (e.g., Chat, Login)
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Vite entry point
│   ├── .eslintrc.cjs         # ESLint config
│   ├── vite.config.js        # Vite config
│   ├── package.json          # Frontend package.json (provided)
│   └── package-lock.json     # Lock file
│
├── .gitignore                # Ignores node_modules/, .env, etc.
└── README.md                 # Project documentation
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