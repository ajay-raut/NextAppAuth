"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function ChangePasswordPage(){

    const [user, setUser] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.
    useState(false);

    const [loading, setLoading] = React.useState(false); 

    const onChangePassword = async ()=>{

        try {
            setLoading(true);
            const res = await axios.put('/api/users/settings/changepassword',user);
            console.log("password changed successfully.");
        } catch (error:any) {
            console.log("reset password failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }

    }

    const onForgotPassword = async ()=>{

        const res = await axios.post('/api/users/reset-password');
        console.log(res)
    }

    useEffect(()=>{
        if(user.oldPassword.length > 0 &&user.newPassword.length > 0 && user.confirmPassword.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    return(
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "reset password"}</h1>
            <hr />
            <label htmlFor="oldPassword">oldPassword</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="oldPassword"
                type="text"
                value={user.oldPassword}
                onChange={(e) => setUser({ ...user, oldPassword: e.target.value })}
                placeholder="oldPassword"
            />
            <label htmlFor="newPassword">newPassword</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="newPassword"
                type="newPassword"
                value={user.newPassword}
                onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                placeholder="newPassword"
            />
            <label htmlFor="confirmPassword">confirmPassword</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="confirmPassword"
                type="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                placeholder="confirmPassword"
            />
            <button 
                disabled={buttonDisabled}
                onClick={onChangePassword}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold 
                rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-opacity-50"
                >{buttonDisabled ? "something missing" : "Save password"}
            </button>

            <button 
                onClick={onForgotPassword}
                className="mt-4 px-6 py-3 font-semibold text-blue-500 hover:text-blue-600 focus:outline-none" 
            >
            Forgot Password
            </button>
        </div>
    )
}