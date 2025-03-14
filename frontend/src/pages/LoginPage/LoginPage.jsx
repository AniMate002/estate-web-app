import React, { useState } from 'react'
import * as styles from "./LoginPage.module.css"
import Input from '../../components/Input/Input'
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { setAuthUser } = useAuth()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            if ("error" in data) throw new Error(data.error);
            setError(null)
            setAuthUser(data)
            navigate("/")
        } catch (e) {
            setError(e.message)
            console.log("Error in login handler: ", e.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <Input
                        value={email}
                        type={"email"}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Email"}
                        Icon={MdOutlineEmail}
                        className={styles.loginInput}
                    />
                    <Input
                        value={password}
                        type={"password"}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Password"}
                        Icon={MdPassword}
                        className={styles.loginInput}
                    />
                    <button
                        disabled={loading}
                        className={styles.loginButton}
                        type='submit'>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                {error && <h2 className={styles.loginError}>{error}</h2>}
            </div>
        </div>
    )
}

export default LoginPage