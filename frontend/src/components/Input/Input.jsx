import React from 'react'
import * as styles from "./Input.module.css"

const Input = ({placeholder, iconsSize = 24, Icon, ...props}) => {
  return (
    <div className={styles.input_container}>
        {Icon && <Icon size={iconsSize} color="#555" />}
        <input placeholder={placeholder} {...props}/>
    </div>
  )
}

export default Input