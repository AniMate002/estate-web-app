import React, { useEffect, useState } from 'react'
import PropertyCard from "../components/PropertyCard";
import styles from "./app.module.css"
import Header from '../components/Header/Header';
import Input from '../components/Input/Input'
import { GoHome, GoLocation } from "react-icons/go";
import Loading from '../components/Loading/Loading';
import Sort from '../components/Sort/Sort';

const MainPage = () => {

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    // SORT TYPES: createdAt, name, price, square
    const [sortType, setSortType] = useState("createdAt")
    const [sortIndex, setSortIndex] = useState(-1);
    
    const fetchHouses = async (name="", location="") => {
      try {
        setLoading(true);
        let URI = "/api/houses"
        if(name || location) URI += "/?name=" + name + "&location=" + location;
        const res = await fetch(URI);
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

    const sortHouses = async (sortType, sortIndex) => {
      const currentHouses = [...houses];
      currentHouses.sort((a, b) => {
        if (sortType === "name") {
          return -sortIndex * a.name.localeCompare(b.name);
        } else if (sortType === "createdAt") {
          return sortIndex * (new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortType === "price") {
          return sortIndex * (a.price - b.price);
        } else if (sortType === "square") {
          return sortIndex * (a.square - b.square);
        }
        return 0;
      })
      setHouses(currentHouses)
    }

    useEffect(() => {
      sortHouses(sortType, sortIndex)
    }, [sortIndex, sortType])

    useEffect(() => {
      fetchHouses();
    }, []);

    const handleSearchHouses = (e) => {
      e.preventDefault();
      fetchHouses(name, location);
    }
  
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
        <form onSubmit={handleSearchHouses} className={styles.searchBar}>
            <Input value={name} onChange={e => setName(e.target.value)} Icon={GoHome} placeholder={"Enter name / description"}/>
            <Input value={location} onChange={e => setLocation(e.target.value)} Icon={GoLocation} placeholder={"Location"}/>
            <button className={styles.searchButton}>Search Property</button>
        </form>
      </div>

      {/* NUMBER OF RESULT AND SORT */}
      {loading ? (null) : (<div className={styles.sort_container}>
        <p>Showing total {houses.length} results</p>
        <Sort sortType={sortType} setSortType={setSortType} options={["createdAt", "name", "price", "square"]}/>
      </div>)}
      
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