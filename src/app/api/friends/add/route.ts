import { addFriendValidator } from "@/lib/validations/add-friend"

export async function POST(req:Request){
    try {
        const body = await req.json()

        const {email : emailTOAdd} = addFriendValidator.parse(body.email)

        const RESTResponce = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailTOAdd}`,{
            headers:{
                Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
            },
            cache:'no-store'
        })
    } catch (error) {
        
    }
} 