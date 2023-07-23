import React from "react"
import Back from "../common/Back"
import "../home/recent/recent.scss"

import img from "../images/Camera.jpg"

const CartCard = () => {
    return (
        <>
            <section className='blog-out mb'>
                <Back name='Shopping Cart' title='rent your camera and gears at affordable price ' cover={img} />
                <div className='container recent'>
                </div>
            </section>
        </>
    )
}

export default CartCard
