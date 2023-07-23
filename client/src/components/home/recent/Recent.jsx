import React from "react"
import Heading from "../../common/Heading"
import "./recent.scss"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='py-4 recent'>
        <div className='container'>
          <Heading title='Featured Rental' subtitle='Get the best rental rates out there.' />
          <RecentCard show="camera"/>
        </div>
      </section>
    </>
  )
}

export default Recent
