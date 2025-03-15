import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import * as styles from "./ProfilePage.module.css";

import React, { useEffect, useState } from 'react'
import PropertyCard from "../../components/PropertyCard";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);
    const { authUser } = useAuth()

    const navigate = useNavigate()

    const fetchUser = async () => {
        if(!authUser) return navigate("/login")
        try{
            setLoading(true);
            const res = await fetch("/api/users/" +  authUser._id);
            const data = await res.json();
            console.log("USER PROFILE: ", data)
            if("error" in data) throw new Error(data.error);
            setUser(data);
            setError(null);
        }catch(e){
            console.log("Error in getUser: ", e.message);
            alert("Error while fetching user:" + e.message);
            setError(e.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if(error) return <h1>Error: {error}</h1>
    console.log("LIKED: ", user?.liked)
    const renderedLikesHouses = user?.liked.map((house) => <PropertyCard house={house} key={house._id}/>)
  return (
    <div>
        {
            loading
            ?
            <h1>Loading...</h1>
            :
            <>
                <h1>Profile of: {user?.name}</h1>    
                <h1>Email: {user?.email}</h1>    
                <img width={60} src={user?.avatar}/>    
                <h3>Liked houses:</h3>
                <div style={{display: "flex"}}>{renderedLikesHouses}</div>
            </>
        }
    </div>
  )
}

export default ProfilePage