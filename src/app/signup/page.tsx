"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.
    useState(false);
    const [loading, setLoading] = React.useState(false); 

    const onSignup = async () => {

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("Sinup Success",response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("SignUp Failed", error.message)
            toast.error(error.message);
        }finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);


    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="mt-4 p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:border-blue-500 text-gray-900"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button 
                onClick={onSignup}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold 
                rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-opacity-50"
                >{buttonDisabled ? "NoSignup" : "Signup"}
            </button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}