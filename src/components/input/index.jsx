import React from 'react'
import './input.css'

export default function Input(props) {
  return (
   <input className='form-input' type="text" {...props} />
  )
}
