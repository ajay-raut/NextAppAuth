import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request:NextRequest){

    try {

        const reqBody = await request.json();
        const {oldPassword, newPassword, confirmPassword} = reqBody;
        const userData = await getDataFromToken(request);
        const userPassword = await User.findOne({_id: userData.id}).select("password");
        const isPasswordMatched = await bcryptjs.compare(oldPassword,userPassword.password);
console.log(isPasswordMatched)
        // check oldpassword and userpassword matched
        if(!isPasswordMatched){
            return NextResponse.json({error:"Password not matched"},{
                status: 400
            })
        }

        if(newPassword !== confirmPassword){
            return NextResponse.json({error:"new password and confirm password not matched"},{
                status: 400
            })
        }

        if(oldPassword === newPassword){
            return NextResponse.json({error:"old and new password should not be same"},{
                status:400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword,salt);

        await User.findByIdAndUpdate(userData.id,{password:hashedNewPassword});
        

        return NextResponse.json({
            message:"password changed succesfullly",
            success:true
        })
        
    } catch (error:any) {
        
    }
}