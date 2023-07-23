import React from "react"

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'>
        <div className='container'>
          <span className="capitalize">{name}</span>
          <h1>{title}</h1>
        </div>
        <img src={cover} alt='' />
      </div>

      <div>
        
      </div>
    </>
  )
}

export default Back
