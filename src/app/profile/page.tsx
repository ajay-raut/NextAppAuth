"use client";
import axios from "axios"
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

export default function ProfilePage(){

    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {

        try {
            await axios.get("/api/users/logout");
            toast.success('Logout Successful');
            router.push('login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    const resetPassword = async ()=>{

        router.push('profile/change-password');
    }
    return(
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>ProfilePage</h1>
            <hr />
            <p>ProfilePage</p>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link 
            href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
            onClick={getUserDetails}
            className="bg-green-500 mt-4 hover:bg-green-700 
            text-white font-bold py-2 px-4 rounded"
            >GetUserDetail</button>

            <button
            onClick={resetPassword}
            className="bg-green-500 mt-4 hover:bg-green-700 
            text-white font-bold py-2 px-4 rounded"
            >reset password</button>
        </div>
    )
}