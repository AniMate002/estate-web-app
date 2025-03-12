import React from "react";
import { Link } from "react-router-dom";
import styles from "./PropertyCard.module.css";

const PropertyCard = ({ house }) => {
    return (
        // <div className={styles.propertyCard}>
        //     <div className={styles.imageContainer}>
        //         {house.image ? (
        //             <img src={house.image} alt={house.name} />
        //         ) : (
        //             <div className={styles.placeholder}></div>
        //         )}
        //     </div>
        //     <p className={styles.location}>{house.location}</p>
        //     <p className={styles.price}>${house.price}</p>
        //     <button>Invest now</button>
        // </div>
        <Link to={`/property/${house.id}`} state={{ house }} className={styles.propertyCard}>
            <div className={styles.imageContainer}>
                {house.image ? (
                    <img src={house.image} alt={house.name} />
                ) : (
                    <div className={styles.placeholder}></div>
                )}
            </div>
            <p className={styles.location}>{house.location}</p>
            <p className={styles.price}>${house.price}</p>
            <button>Invest now</button>
        </Link>
    );
};

export default PropertyCard;
