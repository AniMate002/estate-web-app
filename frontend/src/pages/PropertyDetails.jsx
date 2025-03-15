import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PropertyDetails.module.css";
import PropertyCard from "../components/PropertyCard";
import Header from '../components/Header/Header';
import { FaLiraSign, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading/Loading";
import { Toast } from "../components/Toast/Toast";

const PropertyDetails = () => {
    const { id } = useParams();
    const { authUser, setAuthUser } = useAuth();
    const [house, setHouse] = useState(null);
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHouseById = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/houses/${id}`);
                const data = await res.json();
                if (!data) throw new Error("Data not received");
                if (data.error) throw new Error(data.error);
                setHouse(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        const fetchHouses = async () => {
            try {
                const res = await fetch("/api/houses");
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format");
                setHouses(data);
            } catch (e) {
                console.error("Error fetching houses", e);
            }
        };

        fetchHouseById();
        fetchHouses();
    }, [id]);

    useEffect(() => {
        if (!house || !authUser || !authUser.liked) return;
    
        setLiked(authUser.liked.includes(house._id));
    }, [house, authUser]);
    

    useEffect(() => {
        console.log("LIKED: ", liked)
    }, [liked])

    const handleLike = async() => {
        if(!authUser){
            Toast.fire({
                icon: "info",
                title: "Login to like this house"
            })
            return navigate("/login");
        }
        if(!house) return;
        try {
            setLikeLoading(true);
            const res = await fetch("/api/houses/like/" + house._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: ""
            });
            const data = await res.json();
            if("error" in data) throw new Error(data.error);

            setAuthUser(prev => {
                if (!prev) return prev;
                if (liked) {
                    return {
                        ...prev,
                        liked: prev.liked.filter(id => id !== house._id.toString())
                    };
                } else {
                    return {
                        ...prev,
                        liked: [...prev.liked, house._id.toString()]
                    };
                }
            });
            Toast.fire({
                icon: "success",
                title: data.message
            })
            // setLiked(prev => !prev);
            console.log("LIKE: ", data)
        } catch (e) {
            console.log("ERROR likeHouse: ", e.message);
            Toast.fire({
                icon: "error",
                title: e.message
            })
        }finally{
            setLikeLoading(false);
        }
    }

    if (error) return <div>Error: {error}</div>;


    const recommendedHouses = houses
        .filter(h => h._id !== id) 
        .sort(() => 0.6 - Math.random()) 
        .slice(0, 6); 

    const formatPrice = (price) => {
        const numPrice = typeof price === "number" ? price : parseFloat(price);

        if (numPrice >= 1000000) {
            return (numPrice / 1000000).toFixed(1) + 'M';
        }
        if (numPrice >= 1000) {
            return (numPrice / 1000).toFixed(1) + 'K';
        }
        return numPrice.toString();
    };

    return (
        <div className={styles.container}> 
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <div className={styles.main_image_wrapper}>
                        <Header />
                    </div>
                    <div className={styles.propertyDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.imageContainer}>
                                {house?.image ? (
                                    <img src={house.image} alt={house.name} />
                                ) : (
                                    <div className={styles.placeholder}></div>
                                )}
                            </div>
                            <div className={styles.textContainer}>
                                <h1>{house?.name}</h1>
                                <p><strong>Location:</strong> {house?.location}</p>
                                <p><strong>Beds:</strong> {house?.beds} | <strong>Baths:</strong> {house?.baths}</p>
                                <p><strong>Size:</strong> {house?.square} sqft</p>
                                <p className={styles.description}><strong>Description:</strong> {house?.description}</p>
                                <p className={styles.price}><strong>Price:</strong> ${formatPrice(house?.price)}</p>
                                <div className={styles.buttonsContainer}>
                                    <button className={styles.buyButton}>Buy Now</button>
                                    <button disabled={likeLoading} onClick={handleLike} style={{backgroundColor: liked ? "#cf2929" : "#777777", borderColor: liked ? "#cf2929" : "#777777"}} className={styles.likeButton}>
                                        {likeLoading ? <Loading fontSize={20} /> : <FaRegHeart  />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Recommended Properties Footer */}
                    <div className={styles.recommendedFooter}>
                        <h2 className={styles.recommendedTitle}>Recommended Properties</h2>
                        <div className={styles.recommendedList}>
                            {recommendedHouses.map(house => (
                                <PropertyCard key={house._id} house={house} />
                            ))}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default PropertyDetails;
