import React from "react"

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div className='mb-16 heading'>
        <h1 className="mb-2">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  )
}

export default Heading
