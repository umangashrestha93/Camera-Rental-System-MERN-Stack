import React from "react"
import Back from "../../common/Back"
import Team from "../team/Team"
import "../recent/recent.scss"
import img from "../../images/photographer.jpg"

const Photographers = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Photographer' title='hire your photographer at affordable price' cover={img} />
        <div className='container recent'>
          <Team />
        </div>
      </section>
    </>
  )
}

export default Photographers
