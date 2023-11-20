import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class appwrite
{
    client =new Client();
    account;

    constructor()
    {
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwrite_projectId);       
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name})
    {
        try
        {
            let useraccount=await this.account.create(ID.unique(),email,password,name);
            if(useraccount)
            {
                return this.login({email,password});
            }
            else
            {
                return useraccount;
            }
        }
        catch(error)
        {
            throw error;
        }
    }

    async login({email,password})
    {
        try{
            return await this.account.createEmailSession(email,password);
        }
        catch(error)
        {
            throw error;
        }
    }

    async getCurrentUser()
    {
        try{
            return await this.account.get();
        }
        catch(error)
        {
            console.log("Appwrite serivce :: getCurrentUser :: error",error);
        }
        return null;
    }

    async logout()
    {
        try{
            await this.account.deleteSessions();
        }
        catch(error)
        {
            console.log("Appwrite serivce :: logout :: error",error);
        }
    }
}


const appwriteobj=new appwrite();
export default appwriteobj