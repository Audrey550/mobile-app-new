import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //Voeg een product toe aan de winkelwagen
    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    //Verwijder een product uit de winkelwagen
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    //Leeg het winkelwagentje
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);