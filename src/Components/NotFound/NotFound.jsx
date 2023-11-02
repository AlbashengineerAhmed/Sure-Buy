import React from 'react'
import './NoteFound.css'
import notfoundImg from '../../images/error.svg'
function NotFound() {
  return (
    <div className='notfound'>
      <div className='item-image-notfound'>
        <img className='w-100' src={notfoundImg} alt="" />
      </div>
    </div>
  )
}

export default NotFound