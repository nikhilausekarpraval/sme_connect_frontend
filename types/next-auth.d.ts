import NextAuth from "next-auth";


declare module  "next-auth" {
    interface Session{
        user:{
            id:number;
            userName:string;
            name:string;
            email:string;
            address:string;
            zip:string;
            role:string;
            idToken:string;
            image;
        },
        accessToken:string;
        idToken:string;
    }
}