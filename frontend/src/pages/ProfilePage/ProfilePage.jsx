import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import * as styles from "./ProfilePage.module.css";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";

import React, { useEffect, useState } from "react";
import PropertyCard from "../../components/PropertyCard";

const ProfilePage = ({ authUser, loadingAuth, errorAuth }) => {
    // if (errorAuth) return <h1>Error: {errorAuth}</h1>;
    if (!loadingAuth && !authUser) return <Navigate to={"/login"} />;

    console.log("LIKED: ", authUser?.liked);
    const renderedLikesHouses = authUser?.liked?.length ? (
        authUser.liked.map((house) => (
            <PropertyCard house={house} key={house._id} />
        ))
    ) : (
        <p className={styles.noHousesText}>You haven't liked any houses yet.</p>
    );
    // const renderedLikesHouses = [];
    return (
        <div className={styles.mainContainer}>
            <div className={styles.main_image_wrapper}>
                <Header />
            </div>
            <div className={styles.profileContainer}>
                {loadingAuth ? (
                    <div className={styles.loadingContainer}>
                        <Loading />
                    </div>
                ) : (
                    authUser && (
                        <div className={styles.profileContent}>
                            <div className={styles.profileHeader}>
                                <div className={styles.avatarContainer}>
                                    <img
                                        className={styles.avatar}
                                        src={authUser.avatar}
                                        alt='User Avatar'
                                    />
                                </div>
                                <div className={styles.userInfo}>
                                    {/* <p className={styles.profileText}>Welcome to your profile page!</p> */}

                                    <h1 className={styles.userName}>
                                        Name:{" "}
                                        <span className={styles.profileInfo}>
                                            {authUser.name}
                                        </span>
                                    </h1>
                                    <h2 className={styles.userEmail}>
                                        Mail:{" "}
                                        <span className={styles.profileInfo}>
                                            {authUser.email}
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <div className={styles.likedHousesSection}>
                                <h3 className={styles.likedHousesTitle}>
                                    Your Favorite Houses
                                </h3>
                                <div className={styles.likedHousesGrid}>
                                    {renderedLikesHouses}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
