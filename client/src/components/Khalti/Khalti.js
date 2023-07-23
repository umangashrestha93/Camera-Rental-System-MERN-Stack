import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";

import KhaltiConfig from './KhaltiConfig';

export default function Khalti({ totalAmount, productName, productIdentity, handleSubmit }) {
    let checkout = new KhaltiCheckout(KhaltiConfig(productName, productIdentity, handleSubmit));

    return (
        <button
            type="button"
            onClick={() => checkout.show({ amount: totalAmount})}
            className='px-4 py-2 mt-3 bg-teal-500 border border-gray-300 text-gray-50 hover:bg-teal-600'
        >
            Pay Via Khalti
        </button>
    )
}
