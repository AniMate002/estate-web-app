import React, { useEffect, useState } from 'react'
import PropertyCard from "../components/PropertyCard";
import styles from "./app.module.css"

const MainPage = () => {

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchHouses = async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/houses");
          const data = await res.json();
          if (!data) throw new Error("Data not received");
          if (data.error) throw new Error(data.error);
          setHouses(data);
        } catch (e) {
          setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };
  
      fetchHouses();
    }, []);
  
    if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
            <h1>Find your perfect investment properties</h1>
            <p>
                Explore a selection of high-value real estate opportunities designed
                for financial growth and stability.
            </p>
        </header>

        {/* SEARCH BAR */}
        <div className={styles.searchBar}>
            <input type="text" placeholder="Enter address" />
            <input type="text" placeholder="Location" />
            <select>
                <option>Property type</option>
            </select>
            <button className={styles.searchButton}>Search Property</button>
            <button className={`${styles.searchButton} ${styles.advanced}`}>
                Advanced Search
            </button>
        </div>

        {/* RENDERED HOUSES */}
        {loading ? (
        <div className={styles.loadingContainer}>
            <h1>Loading...</h1>
        </div>
        ) : (
        <div className={styles.propertyList}>
            {houses?.map((house) => (
                <PropertyCard key={house._id} house={house} />
            ))}
        </div>
        )}
    </div>
  )
}

export default MainPage