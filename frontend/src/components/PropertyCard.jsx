import React from "react";
import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import styles from "./PropertyCard.module.css";
import { IoIosResize, IoMdBed } from "react-icons/io";
import { LuBath } from "react-icons/lu";

const PropertyCard = ({ house }) => {
    console.log("SINGLE HOUSE:", house)
    return (
        <Link to={`/property/${house._id}`} state={{ house }} className={styles.propertyCard}>
            <div className={styles.imageContainer}>
                {house.image ? (
                    <img src={house.image} alt={house.name} />
                ) : (
                    <div className={styles.placeholder}></div>
                )}
            </div>
            <p className={styles.name}>{house.name}</p>
            <div className={styles.location_container}>
                <GoLocation color="grey" size={15} />
                <p className={styles.location}>{house.location}</p>
            </div>
            <div className={styles.details}>
                <div className={styles.location_container}>
                    <IoIosResize color="grey" size={12}/>
                    <p>{house.square} sq. ft.</p>
                </div>
                <div className={styles.divider}/>
                <div className={styles.location_container}>
                    <IoMdBed color="grey" size={15}/>
                    <p>{house.beds} Bed</p>
                </div>
                <div className={styles.divider}/>
                <div className={styles.location_container}>
                    <LuBath color="grey" size={13}/>
                    <p>{house.baths} Bed</p>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
