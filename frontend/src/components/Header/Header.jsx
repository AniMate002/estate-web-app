import React from 'react'
import * as styles from "./Header.module.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles.header_container}>
        <h1 className={styles.logo}>Estate App</h1>
        <div className={styles.nav_container}>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Properties</Link>
          <Link to={"/"}>Loan</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Contact</Link>
        </div>
        <div className={styles.buttons_container}>
          <Link className={styles.login_button} to={"/login"}>Log in</Link>
          <Link className={styles.signup_button} to={"signup"}>Join now</Link>
        </div>
    </div>
  )
}

export default Header