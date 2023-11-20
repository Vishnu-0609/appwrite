import { Client,ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf";

export class Service
{
    client =new Client();
    databases;
    bucket;
    constructor()
    {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwrite_projectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try
        {
            return await this.databases.createDocument(conf.appwrite_databaseId,conf.appwrite_collectionId,slug,{title,content,featuredImage,status,userId,});
        }
        catch(error)
        {
            console.log("Appwrite serivce :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try
        {
            return await this.databases.updateDocument(conf.appwrite_databaseId,conf.appwrite_collectionId,slug,{title,content,featuredImage,status});
        }
        catch(error)
        {
            console.log("Appwrite serivce :: updatePost :: error",error);
        }
    }

    async deletePost(slug)
    {
        try
        {
            await this.databases.deleteDocument(conf.appwrite_databaseId,conf.appwrite_collectionId,slug);
            return true;
        }
        catch(error)
        {
            console.log("Appwrite serivce :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug)
    {
        try{
            return await this.databases.getDocument(conf.appwrite_databaseId,conf.appwrite_collectionId,slug);
        }
        catch(error)
        {
            console.log("Appwrite serivce :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal('status','active')])
    {
        try{
            return await this.databases.listDocuments(conf.appwrite_databaseId,conf.appwrite_collectionId,queries);
        }
        catch(error)
        {
            console.log("Appwrite serivce :: getPosts :: error",error);
            return false;
        }
    }

    async uploadFile(file)
    {
        try
        {
            return await this.bucket.createFile(conf.appwrite_bucketId,ID.unique(),file);
        }
        catch(error)
        {
            console.log("Appwrite serivce :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileid)
    {
        try
        {
            await this.bucket.deleteFile(conf.appwrite_bucketId,fileid);
            return true;
        }
        catch(error)
        {
            console.log("Appwrite serivce :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId)
    {
       
        return this.bucket.getFilePreview(conf.appwrite_bucketId,fileId);
    }
}

const service=new Service();

export default service;