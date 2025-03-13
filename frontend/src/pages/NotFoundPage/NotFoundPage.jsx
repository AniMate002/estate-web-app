import React from 'react'
import * as styles from './NotFoundPage.module.css'
import { Link, useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <Link to={"/"} className={styles.title}>Estate App</Link>
            <p className={styles.error_title}>Ooops... It looks like this page doesn't exist: 404</p>
            <button onClick={() => navigate("/")} className={styles.button}>Go home</button>
        </div>
    </div>
  )
}

export default NotFoundPage