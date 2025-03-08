import File from '../models/File.js';

// This class only works on file metadata in db ( not s3 storage )
class FileService {

    constructor(user_id) {
        this.user_id = user_id;
    }

    async retrieveAllUserRepoFile() {
        // provide file metadata except file key
        const files = await File.find({ user_id:this.user_id }, { file_key: 0 });
        return files;
    }

    async retrieveFile(file_id) {
        try {
          const file = await File.findOne({ file_id });
          if (file) { 
            return file;
          } else {
            throw new Error("File not found.");
          }
        } catch (error) {
          throw new Error(error.message || "Error retrieving file key.");
        }
      }



    
    
    // Uploads file to storage if not exists, returns true if newly uploaded.
    async uploadAndCheckFile(file, group_id) {
        try {
            
            const existingFile = await this.isFileAlreadyUploaded(file.file_hash);
            
            if (existingFile) {
                file.file_key = existingFile.file_key;
                await this.uploadRepoFile(file, group_id);
                return { isUploaded: false, file: existingFile };
            }

            
            const newFile = await this.uploadRepoFile(file, group_id);
            return { isUploaded: true, file: newFile };
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
    async saveFile(file) {

        try {

            if (!file || !file.file_name || !file.file_type || !file.file_size || !file.file_key || !file.file_hash || !file.group_id || !file.uploaded_by) {
                throw new Error("Invalid file data.");
            }
    
            
            const existingFile = await this.isFileAlreadySaved(file.file_hash);
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
                user_id: this.user_id
            });

            await newFile.save();
            return newFile;
        } catch (error) {
            throw new Error(error.message || "Error saving file to database.");
        }
    }

    async isFileAlreadySaved(hash) {
        return await File.findOne({ file_hash: hash, user_id: this.user_id });
    }
    
    
    async isFileAlreadyUploaded(hash) {
        return await File.findOne({ file_hash: hash });
    }

}

export default FileService;