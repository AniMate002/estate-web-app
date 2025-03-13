import React, { useEffect, useRef, useState } from 'react'
import * as styles from "./Sort.module.css"
import { IoIosArrowDown } from "react-icons/io";


const Sort = ({options, setSortType, sortType}) => {
    const [isOpened, setIsOpened] = useState(false)
    const arrow = useRef()
    const modal = useRef()
    const handleOpenModal = () => {
        setIsOpened(prev => !prev)
        arrow.current.classList.toggle("rotate-180deg")
        modal.current.classList.toggle("display-modal")
    }
  return (
    <div className={styles.sort_container}>
        <div onClick={handleOpenModal} className={styles.current_sort_type}>
            <p>{sortType}</p>
            <IoIosArrowDown ref={arrow}/>
        </div>
        <div ref={modal} className={styles.modal}>
            {
                options.map((option, index) => <p key={index} onClick={() => setSortType(option)} className={styles.modal_option}>{option}</p>)
            }
        </div>
    </div>
  )
}

export default Sort