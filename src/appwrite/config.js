import conf from '../conf/conf'
import { Client, Databases,Storage,Query, ID } from "appwrite";


export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases=new Databases(this.client)
            this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        console.log("HERE: ",conf.appwriteDatabaseId);
        console.log("HERE: ",conf);
        console.log("HERE2: ",conf.appwriteCollectionID);
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                )
        } catch (error) {
            console.log("Appwrite Service error :: createpost :: error",error);
        } 
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
           return await this.databases.updateDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
                )
        } catch (error) {
            console.log("Appwrite Service error :: updatePost :: error",error);
        }

    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug)
                return true
        } catch (error) {
            console.log("Appwrite Service error :: deletePost :: error",error);
            return false
        }

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug)
        } catch (error) {
            console.log("Appwrite Service error :: getPost :: error",error);
            return false
        }

    }
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries,
                
            )
        } catch (error) {
            console.log("Appwrite Service error :: getPosts :: error",error);
            return false
            
        }
    }
    //file upload service

    async uploadFile(File){
        try {
            console.log(File.name);
            console.log(conf.appwriteBucketId);
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                File
            )
        } catch (error) {
            console.log("Appwrite Service error :: uploadFile :: error",error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,

            )
            return true
            
        } catch (error) {
            console.log("Appwrite Service error :: deleteFile :: error",error);
            
        }

    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }

}


const service = new Service()
export default service

