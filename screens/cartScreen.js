import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {useCart} from '../context/cartContext';
import { useNavigation } from '@react-navigation/native';
import ProductCard from "../components/ProductCard";

const CartScreen = () => {
    const { cartItems, removeFromCart, } = useCart();
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const itemId = item.id || item.name; // Voeg een fallback in voor het item ID als item.id niet bestaat
        return (
            <View style={styles.item} key={itemId}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.subtitle}</Text>
                    <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                    <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your cart</Text>
            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => (item.id ? item.id.toString() : item.name.toString())}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</Text>
                    </View>
                    <></>

                </>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity style={styles.goHomeButton} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.goHomeText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

/*Kleurencodes:
  Background: #171717
  Product card background: #2f2f2f
  Product card text: #ffffff
  Product card button: #45ff45
  Blog card background: #2f2f2f
  Blog card text: #ffffff
  Blog card button: #4580ff
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#2f2f2f',
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
     description: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 4,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    quantity: {
        color: '#4580ff',
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 4,
        borderRadius: 4,
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 8,
        width: 100,
    },
    emptyCartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyCartText: {
        color: '#45ff45',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    goHomeButton: {
        backgroundColor: '#4580ff',
        padding: 10,
        borderRadius: 8,
        fontWeight: 'bold',
        marginTop: 20,
    },
    goHomeText: {
        color: '#171717',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2f2f2f',
        borderRadius: 8,
    },
    totalText: {
        color: '#45ff45',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CartScreen;