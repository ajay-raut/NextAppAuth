import bcryptjs from "bcryptjs"


export const generateHashedToken = (userId: string,salt: number = 10)=>{

    try {
        return bcryptjs.hash(userId,salt);

    } catch (error:any) {
        throw new Error(error.message);
    }
}