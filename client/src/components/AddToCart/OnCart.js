import React, { useState } from 'react';
import "./OnCart.css"

function Product({ id, name, price, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        onAddToCart({ id, name, price, quantity });
    };
    return (
        <div className="product">
            <h2>{name}</h2>
            <p>Price: ${price}</p>
            <label>
                Quantity:
                <input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
            </label>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}
function Cart({ items, total }) {
    return (
        <div className="cart">
            <h2>Cart</h2>
            <ul className="cart-items">
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} x {item.quantity} - ${item.price * item.quantity}
                    </li>
                ))}
            </ul>
            <p>Total: ${total}</p>
        </div>
    );
}
function OnCart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const handleAddToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, item]);
        }
        setCartTotal(cartTotal + item.price * item.quantity);
    };
    
    return (
        <div className="app">
            <Product id={1} name="Product 1" price={10} onAddToCart={handleAddToCart} />
            <Product id={2} name="Product 2" price={20} onAddToCart={handleAddToCart} />
            <Cart items={cartItems} total={cartTotal} />
        </div>
    );
}

export default OnCart;