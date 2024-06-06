import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any)=>{

    try {
        // create hased token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)


        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordTokenn: hashedToken,
                    forgotPasswordTokenExpire: Date.now() + 3600000
                }
            )
        }

        var transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 2525,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD
            }
          });

          const mailOptions = {
            from:'ajay@gmail.com',
            to:email,
            subject:emailType === "VERIFY" ? "Verify your Email":
            "Reset your password",
            html:`<p>Click<a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : 
                "reset your password"
            }
            or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} 
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions);

          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}