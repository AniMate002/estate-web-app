import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PropertyDetails.module.css";

const PropertyDetails = ({ houses }) => {
    const { id } = useParams();
    const house = houses.find(h => String(h.id) === id);

    if (!house) return <h1 className={styles.error}>Property not found</h1>;

    return (
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
    );
};

export default PropertyDetails;
