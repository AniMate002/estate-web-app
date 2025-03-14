import React from 'react'
import { VscLoading } from "react-icons/vsc";

const Loading = ({fontSize=70}) => {
  return (
    <VscLoading className='rotating-element' style={{fontSize}}/>
  )
}

export default Loading