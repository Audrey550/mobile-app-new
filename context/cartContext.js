//Importeer React
import React, { createContext, useContext, useState } from 'react';

//Maak een context voor de winkelwagen
const CartContext = createContext();

//CartProvider: Beheer de winkelwagenitems en bied deze aan via de context
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //Voeg een product toe aan de winkelwagen
    const addToCart = (product) => {
    //Controleer of het product een geldig id heeft
    if(!product.id) {
        console.error('Product heeft geen geldig id:', product);
        return;
    }
    setCartItems((prevItems) => {
        if (!product.id){
            console.error('Product heeft geen geldig id:', product);
            return; // Geen wijziging aanbrengen als er geen id is
        }
            //Controleer of het product al in de winkelwagen zit
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                //Als het product al in de winkelwagen zit, verhoog de hoeveelheid
                return prevItems.map((item) =>
                    item.id === product.id
                    ? {...item, quantity:item.quantity + product.quantity} :item
                );
            }
            //Anders voeg het product toe aan de winkelwagen
        return [...prevItems, {...product, quantity: product.quantity || 1}];
    });

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

//Gebruik de context in andere componenten
export const useCart = () => useContext(CartContext);