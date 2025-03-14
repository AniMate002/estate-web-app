import React, { useState } from 'react'
import * as styles from "./SignupPage.module.css";
import Input from '../../components/Input/Input';
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [newUser, setNewUser] = useState({name: "", email: "", password: ""});

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { setAuthUser } = useAuth()
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            const data = await res.json();
            if("error" in data) throw new Error(data.error);
            setError(null);
            setAuthUser(data);
            navigate("/");
        } catch (e) {
            console.log("Error in singup: ", e.message)
            alert("Error in singup: " + e.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <Input value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder={"Name"} Icon={FaRegUser} iconsSize={20}/>
            <Input value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} placeholder={"Email"} Icon={MdOutlineEmail} type="email"/>
            <Input value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} placeholder={"Password"} Icon={MdPassword} type="password"/>
            <button disabled={loading} style={{width: "100%", border: "2px solid black"}} type='submit'>{loading ? "Loading..." : "Sign up"}</button>
        </form>
        {error && <h2 style={{color: "red"}}>{error}</h2>}
    </div>
  )
}

export default SignupPage