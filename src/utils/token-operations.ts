import { sign,verify } from "jsonwebtoken";
import { hashingUserId, isValidUserId } from './hashing-operations'


const tokenSecret = process.env.TOKEN_SECRET as string

const generateToken = (user_id:string):string=>{
    const access = hashingUserId(user_id)
    return sign({access},tokenSecret as string)
}

const checkToken = (token:string,user_id:string):boolean=>{
    
    const tokenDecoded: { access: string } = verify(token, tokenSecret as string) as {access: string}
    return isValidUserId(user_id,tokenDecoded.access)    
}


export {generateToken,checkToken}