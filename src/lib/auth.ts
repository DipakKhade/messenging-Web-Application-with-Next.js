import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google"
import type { Session ,User } from "next-auth"

function getGoogleCreditials(){
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clienSecret = process.env.GOOGLE_CLIENT_SECRET

    if(!clientId || clientId.length===0){
        throw new Error('missing GOOGLE_CLIENT_ID')
    }
    if(!clienSecret || clienSecret.length===0){
        throw new Error('missing GOOGLE_CLIENT_SECRET')
    }

    return {clientId ,clienSecret}
}


export const AuthOptions:NextAuthOptions={
    adapter:UpstashRedisAdapter(db),
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:'/login'
    },
    providers:[                                                    //which provider are we using for log in
        GoogleProvider({
            clientId:getGoogleCreditials().clientId,
            clientSecret:getGoogleCreditials().clienSecret
        })
    ] ,
    callbacks:{
        async jwt({token,user}){                                                    //to determine is it a new user or not
            const dbUser = (await db.get(`use:${token.id}`)) as User | null         // user in defined ib file src/types/db.d.ts and it is similer to models in mongodb                          

            if(!dbUser){
                token.id=user!.id
                return token
            }

            return{
                id:dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                picture:dbUser.image,

            }


        },
        async session({session,token}){
            if(token){
                session.user.id = token.id                                           //defined in next-auth.d.ts
                session.user.name = token.name                                           //defined in next-auth.d.ts
                session.user.email = token.email                                           //defined in next-auth.d.ts
                session.user.image = token.picture                                           //defined in next-auth.d.ts

            }

            return session;
        },

        redirect(){                                                                 //if user is signed in we have to redirect them
            return '/dashbord'
        }
    }

}