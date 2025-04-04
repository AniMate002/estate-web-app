import React, { useEffect, useState } from "react";
import * as styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";
import { Toast } from "../Toast/Toast";

const Header = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("USER IN HEADER: ", authUser);
    }, [authUser, setAuthUser]);
    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: "",
            });
            const data = await res.json();
            if ("error" in data) throw new Error(data.error);
            setAuthUser(null);
            Toast.fire({
                icon: "success",
                title: data.message,
            });
        } catch (e) {
            console.log("Error in logout: ", e.message);
            Toast.fire({
                icon: "error",
                title: e.message,
            });
        } finally {
            setLoading(false);
            navigate("/");
        }
    };
    return (
        <div className={styles.header_container}>
            <button
                className={styles.menu_button}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>
            <h1
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
                className={styles.logo}
            >
                Estate App
            </h1>
            <div
                className={`${styles.nav_container} ${
                    menuOpen ? styles.open : ""
                }`}
            >
                <button
                    className={styles.close_button}
                    onClick={() => setMenuOpen(false)}
                >
                    ✖
                </button>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Properties</Link>
                <Link to={"/"}>Loan</Link>
                <Link to={"/"}>About</Link>
                <Link to={"/"}>Contact</Link>
            </div>
            {authUser ? (
                <div className={styles.logged_container}>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/profile")}
                        className={styles.profile_container}
                    >
                        <div className={styles.avatar_container}>
                            <img
                                alt={"avatar"}
                                className={styles.avatar_image}
                                src={authUser.avatar}
                            />
                        </div>
                        <span>{authUser.name}</span>
                    </div>
                    <button
                        className={styles.logout_button}
                        disabled={loading}
                        onClick={handleLogout}
                    >
                        {loading ? <Loading fontSize={20} /> : "Logout"}
                    </button>
                </div>
            ) : (
                <div className={styles.buttons_container}>
                    <Link className={styles.login_button} to={"/login"}>
                        Log in
                    </Link>
                    <Link className={styles.signup_button} to={"/signup"}>
                        Join now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
