import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='our Services' subtitle='services that we provide' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
