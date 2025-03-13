import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PropertyDetails.module.css";
import PropertyCard from "../components/PropertyCard";

const PropertyDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [houses, setHouses] = useState([]);
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

    if (error) return <div>Error: {error}</div>;

    // Вибираємо три випадкові житла, виключаючи поточне
    // const recommendedHouses = houses.filter(h => h._id !== id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const recommendedHouses = houses
        .filter(h => h._id !== id) // Виключаємо поточне житло
        .sort(() => 0.5 - Math.random()) // Перемішуємо список
        .slice(0, 5); // Вибираємо перші 5 елементів

    return (
        <div className={styles.container}> {/* Обгортка для центрування */}
            {loading ? (
                <h1>Loading</h1>
            ) : (
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
                            <p className={styles.price}><strong>Price:</strong> ${house?.price} ({house?.discount}%)</p>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Properties Footer */}
            <div className={styles.recommendedFooter}>
                <h2 className={styles.recommendedTitle}>Recommended Properties</h2>
                <div className={styles.recommendedList}>
                    {recommendedHouses.map(house => (
                        <PropertyCard key={house._id} house={house} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
