import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PropertyDetails.module.css";

const PropertyDetails = ({ houses }) => {
    const { id } = useParams();
    const [house, setHouse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
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
    
        fetchHouseById();
    }, []);
    
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        {
            loading
            ?
            <h1>Loading</h1>
            :
            <div className={styles.propertyDetails}>
                <div className={styles.detailsContainer}>
                    <div className={styles.imageContainer}>
                        {house.image ? (
                            <img src={house.image} alt={house.name} />
                        ) : (
                            <div className={styles.placeholder}></div>
                        )}
                    </div>
                    <div className={styles.textContainer}>
                        <h1>{house.name}</h1>
                        <p>Location: {house.location}</p>
                        <p className={styles.price}>Price: ${house.price} ({house.discount}%)</p>
                    </div>
                </div>
                <button className={styles.buyButton}>Buy Now</button>
            </div>
        }
            
        </>
    );
};

export default PropertyDetails;
