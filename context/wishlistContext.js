import React, { createContext, useContext, useState } from 'react';

//Context aanmaken voor de verlanglijst
const WishlistContext = createContext();

//Provider component voor de verlanglijst
export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    //Voeg een product toe aan de verlanglijst
    const addToWishlist = (product) => {
        setWishlist((prevItems) => [...prevItems, product]);
    };

    //Verwijder een product uit de verlanglijst
    const removeFromWishlist = (productId) => {
        setWishlist((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems: wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
