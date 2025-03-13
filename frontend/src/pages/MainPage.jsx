import React, { useEffect, useState } from 'react'
import PropertyCard from "../components/PropertyCard";
import styles from "./app.module.css"
import Header from '../components/Header/Header';
import Input from '../components/Input/Input'
import { GoHome, GoLocation } from "react-icons/go";
import Loading from '../components/Loading/Loading';
import { IoIosArrowDown } from "react-icons/io";

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
      <div className={styles.main_image_wrapper}>
        {/* HEADER */}
        <Header />
        {/* TITLE */}
        <header className={styles.header}>
            <div className={styles.tags}><span>Home</span> / Properties</div>
            <h1>Find your perfect investment properties</h1>
            <p>
                Explore a selection of high-value real estate opportunities designed
                for financial growth and stability.
            </p>
        </header>
        {/* SEARCH BAR */}
        <div className={styles.searchBar}>
            <Input Icon={GoHome} placeholder={"Enter address"}/>
            <Input Icon={GoLocation} placeholder={"Location"}/>
            <button className={styles.searchButton}>Search Property</button>
        </div>
      </div>

      {/* NUMBER OF RESULT AND SORT */}
      <div className={styles.sort_container}>
        <p>Showing total {houses.length} results</p>
        <div>
          <p>Most popular</p>
          <IoIosArrowDown />
        </div>
      </div>
      
      {/* RENDERED HOUSES */}
      {loading ? (
        <div style={{marginTop: 100}}>
          <Loading />
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