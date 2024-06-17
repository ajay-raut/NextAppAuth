"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage({params}:any){

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [user, setUser] = React.useState({
        resetPasswoedToken:token,
        newPassword: "",
        confirmPassword:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.
    useState(false);

    const [loading, setLoading] = React.useState(false); 

    const onResetPassword = async ()=>{

        try {
            setLoading(true);
            const response = await axios.put("/api/users/reset-password",user);
            console.log(response.data);
            toast.success("password updated login with new password")
        } catch (error:any) {
            console.log("reset password failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(user.newPassword.length > 0 && user.confirmPassword.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    

    return(
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>reset password</h1>
            <hr />
            <label htmlFor="newPassword">newPassword</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="newPassword"
                type="text"
                value={user.newPassword}
                onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                placeholder="newPassword"
            />
            <label htmlFor="confirmPassword">confirmPassword</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="confirmPassword"
                type="text"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                placeholder="confirmPassword"
            />
            
            <button 
                onClick={onResetPassword}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold 
                rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-opacity-50"
                > {buttonDisabled ? "something missing" : "Reset Password"}
            </button>
        </div>
    )
}