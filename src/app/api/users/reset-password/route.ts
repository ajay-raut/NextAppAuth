import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailler";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";


connect()
export async function POST(request:NextRequest){

    try {

        const userData = await getDataFromToken(request);
        
        await sendEmail({email:userData.email,emailType: "RESET",
            userId: userData.id})

                return NextResponse.json({
                    message:"reset mail sent successfully",
                    success:true
                })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:400
        })
    }
}

export async function PUT(request:NextRequest){
    try {
        const reqBody = await request.json();
        const { resetPasswoedToken, newPassword, confirmPassword } = reqBody;
        
        const user = await User.findOne({forgotPasswordToken:resetPasswoedToken,
            forgotPasswordTokenExpire:{$gt:Date.now()}
        })

        const userData = await getDataFromToken(request);
        const userPassword = await User.findOne({_id: userData.id}).select("password");
        const isPasswordMatched = await bcryptjs.compare(newPassword,userPassword.password);

        if(!user){
            return NextResponse.json({error:"Invalid Token"},
            {
                status: 400
            })
        }

        if(isPasswordMatched){
            return NextResponse.json({error:"new password should match old password"},
            {
                status:400
            })
        }

        if(newPassword !== confirmPassword){
            return NextResponse.json({error:"new password and confirm password not matched"},{
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword,salt);

        console.log(user);

            user.isVerified = true;
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpire = undefined;
            user.password = hashedNewPassword;
            await user.save();

        return NextResponse.json({
            message:"password reset successfully",
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:400
        })
    }
}