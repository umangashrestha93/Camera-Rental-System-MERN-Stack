import React from "react"
import Back from "../../common/Back"
import RecentCard from "../recent/RecentCard"
import "../recent/recent.scss"
import img from "../../images/Camera.jpg"

const Gears = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Lenses and Equipments' title='rent your camera gears and equipment at affordable price' cover={img} />
        <div className='container recent'>
          <RecentCard show="gears" />
        </div>
      </section>
    </>
  )
}

export default Gears
