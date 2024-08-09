import React from 'react'

const ButtonCustom = ({content, bgColor = 'bg-black', type = 'button', onClick}) => {
  return <button type={type} className={`py-2 px-5 text-white rounded-md ${bgColor}`} onClick={onClick}>{content}</button>
}

export default ButtonCustom