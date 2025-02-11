import File from '../models/File.js';

// This class only works on file metadata in db ( not s3 storage )
class FileService {

    constructor(user_id) {
        this.user_id = user_id;
    }

    async retrieveAllUserRepoFile() {
        // provide file metadata except file key
        const files = await File.find({ user_id }, { file_key: 0 });
        return files;
    }

    retrieveRepoFile(file_id) {
        // sends the signed url 
    }

    retrieveUserProfilePic() {
        // retrieve profile pic url from userProfile
        // sends the singned url
    }

    uploadProfilePic() {
        
    }

    retrieveGroupProfilePic() {
        // retrieve profile pic from group
    }

    uploadGroupProfilePic() {

    }

    
    // file should has all prop mentioned ( extracted via multer )
    // Store and check if file upload in storage needed ( boolean )
    async uploadAndCheckFile(file, group_id) {
        try {
            
            const existingFile = await this.isFileAlreadyUploaded(file.file_hash);
            
            if (existingFile) {
                file.key = existingFile.key;
                await this.uploadRepoFile(file, group_id);
                return false;
            }

            
            await this.uploadRepoFile(file, group_id);
            return true;
        } catch (error) {
            throw new Error(`Error during file upload: ${error.message}`);
        }
    }

    // user_id is uploading, a new fresh file 
    async uploadRepoFile(file, group_id) {
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
                uploaded_by: this.user_id, 
                group_id: group_id,
                user_id: this.user_id 
            });

            await newFile.save();
            return newFile;
        } catch (error) {
            throw new Error("Error uploading file in database.");
        }
    }

    // Always duplicate, uploader : who uploaded first ( not user_id )
    async saveFile(file, uploader, group_id) {
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
                uploaded_by: uploader,
                group_id: group_id,
                user_id: this.user_id
            });

            await newFile.save();
            return newFile;
        } catch (error) {
            throw new Error("Error saving file to database.");
        }
    }

    
    async isFileAlreadyUploaded(hash) {
        return await File.findOne({ file_hash: hash });
    }


}