import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {useCart} from '../context/cartContext';

const CartScreen = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };
    const handleClearCart = () => {
        clearCart();
    };
    return (
        <View style={StyleSheet.container}>
            <Text style={styles.header}>Your cart</Text>
            {cartItems.length > 0 ? (
                <FlatList
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Text>{item.price}€</Text>
                        <Button title="Remove" onPress={() => handleRemoveFromCart(item.id)} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            ) : (
                <Text style={styles.empty}>Your cart is empty</Text>
            )}
            <Button title="Clear Cart" onPress={handleClearCart} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default CartScreen;