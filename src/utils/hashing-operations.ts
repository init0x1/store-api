import { compareSync, hashSync } from 'bcrypt'

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

const hashingPassword = (password:string):string =>{
    const password_plus_pepper = password.concat(pepper as string)
    return hashSync(password_plus_pepper,parseInt(saltRounds as string))
}

const isValidPassword = (password:string,hashedPassword:string):boolean =>{
    const password_plus_pepper = password.concat(pepper as string)
    return compareSync(password_plus_pepper, hashedPassword)
}
const hashingUserId = (user_id: string): string => {
    const userid_plus_pepper = user_id.concat(pepper as string)
    return hashSync(userid_plus_pepper, parseInt(saltRounds as string))
  }
  
  const isValidUserId = (user_id: string, hashedUserId: string): boolean => {
    const userid_plus_pepper = user_id.concat(pepper as string)
    return compareSync(userid_plus_pepper, hashedUserId)
  }
  
  export { hashingPassword, isValidPassword, hashingUserId, isValidUserId }