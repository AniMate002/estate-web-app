import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import * as styles from "./ProfilePage.module.css";
import Loading from "../../components/Loading/Loading";
import Header from '../../components/Header/Header';

import React, { useEffect, useState } from 'react'
import PropertyCard from "../../components/PropertyCard";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);
    const { authUser } = useAuth()

    const navigate = useNavigate()

    const fetchUser = async () => {
        if (!authUser) return navigate("/login")
        try {
            setLoading(true);
            const res = await fetch("/api/users/" + authUser._id);
            const data = await res.json();
            console.log("USER PROFILE: ", data)
            if ("error" in data) throw new Error(data.error);
            setUser(data);
            setError(null);
        } catch (e) {
            console.log("Error in getUser: ", e.message);
            alert("Error while fetching user:" + e.message);
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (error) return <h1>Error: {error}</h1>
    console.log("LIKED: ", user?.liked)
    // const renderedLikesHouses = user?.liked.map((house) => <PropertyCard house={house} key={house._id} />)
    const renderedLikesHouses = user?.liked?.length
        ? user.liked.map((house) => <PropertyCard house={house} key={house._id} />)
        : <p className={styles.noHousesText}>You haven't liked any houses yet.</p>;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.main_image_wrapper}>
                <Header />
            </div>
            <div className={styles.profileContainer}>
                {loading ? (
                    <div className={styles.loadingContainer}><Loading /></div>
                ) : (
                    user && (
                        <div className={styles.profileContent}>
                            <div className={styles.profileHeader}>
                                <div className={styles.avatarContainer}>
                                    <img className={styles.avatar} src={user.avatar} alt="User Avatar" />
                                </div>
                                <div className={styles.userInfo}>
                                    {/* <p className={styles.profileText}>Welcome to your profile page!</p> */}

                                    <h1 className={styles.userName}>Name: <span className={styles.profileInfo}>{user.name}</span></h1>
                                    <h2 className={styles.userEmail}>Mail: <span className={styles.profileInfo}>{user.email}</span></h2>
                                </div>
                            </div>
                            <div className={styles.likedHousesSection}>
                                <h3 className={styles.likedHousesTitle}>Your Favorite Houses</h3>
                                <div className={styles.likedHousesGrid}>{renderedLikesHouses}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default ProfilePage  