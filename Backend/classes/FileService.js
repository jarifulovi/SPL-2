

// This class only works on file metadata in db ( not s3 storage )
class FileService {

    constructor(user_id) {
        this.user_id = user_id;
    }

    retrieveAllUserRepoFile() {
        // provide file metadata except signed url
    }

    retrieveRepoFile() {
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

    
    // needs : user_id, hash , signed url
    uploadRepoFile() {
        // use hash algorithm
        // check if the hash already present in db ( file model )
        // if not present 
        //      then store the file metadata with signed url,hash
        //      return true
        // else 
        //      retrieve the hash and url and store with metadata for new user
        //      store : hash and url with current user_id
        //      returns false
    }

    
}