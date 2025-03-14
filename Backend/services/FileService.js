import File from '../models/File.js';

// This module works on file metadata in db (not s3 storage)

export async function retrieveAllUserRepoFile(user_id) {
    // provide file metadata except file key
    const files = await File.find({ user_id }, { file_key: 0 });
    return files;
}

export async function retrieveFile(file_id) {
    try {
        const file = await File.findOne({ file_id });
        if (file) { 
            return { file };
        } else {
            throw new Error("File not found.");
        }
    } catch (error) {
        throw new Error(error.message || "Error retrieving file key.");
    }
}

// Uploads file to storage if not exists, returns true if newly uploaded.
export async function uploadAndCheckFile(file, group_id, user_id) {
    try {
        const existingFile = await isFileAlreadyUploaded(file.file_hash);
        
        if (existingFile) {
            file.file_key = existingFile.file_key;
            await uploadRepoFile(file, group_id, user_id);
            return { isUploaded: false, file: existingFile };
        }

        const newFile = await uploadRepoFile(file, group_id, user_id);
        return { isUploaded: true, file: newFile };
    } catch (error) {
        throw new Error(`Error during file upload: ${error.message}`);
    }
}

// user_id is uploading, a new fresh file 
export async function uploadRepoFile(file, group_id, user_id) {
    if (!file || !file.file_name || !file.file_type || !file.file_size || !file.file_key || !file.file_hash) {
        throw new Error("Invalid file data.");
    }

    try {
        const newFile = new File({
            file_name: file.file_name,
            file_type: file.file_type,
            file_size: file.file_size,
            file_key: file.file_key,
            file_hash: file.file_hash,
            uploaded_by: user_id, 
            group_id: group_id,
            user_id: user_id 
        });

        await newFile.save();
        return newFile;
    } catch (error) {
        throw new Error("Error uploading file in database.");
    }
}

// Always duplicate, uploader : who uploaded first (not user_id)
export async function saveFile(file, user_id) {
    try {
        if (!file || !file.file_name || !file.file_type || !file.file_size || !file.file_key || !file.file_hash || !file.group_id || !file.uploaded_by) {
            throw new Error("Invalid file data.");
        }

        const existingFile = await isUserHasFile(file.file_hash, user_id);
        if(existingFile) {
            throw new Error('File already exists in you repository.');
        }

        const newFile = new File({
            file_name: file.file_name,
            file_type: file.file_type,
            file_size: file.file_size,
            file_key: file.file_key,
            file_hash: file.file_hash,
            uploaded_by: file.uploaded_by,
            group_id: file.group_id,
            user_id: user_id
        });

        await newFile.save();
        return newFile;
    } catch (error) {
        throw new Error(error.message || "Error saving file to database.");
    }
}

export async function isUserHasFile(hash, user_id) {
    return await File.findOne({ file_hash: hash, user_id });
}

export async function isFileAlreadyUploaded(hash) {
    return await File.findOne({ file_hash: hash });
}