import React from 'react'
import * as styles from "./Input.module.css"

const Input = ({placeholder, Icon, ...props}) => {
  return (
    <div className={styles.input_container}>
        {Icon && <Icon size={24} color="#555" />}
        <input placeholder={placeholder} {...props}/>
    </div>
  )
}

export default Input