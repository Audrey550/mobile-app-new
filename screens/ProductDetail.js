//Importeer React
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from "../components/ProductCard";
import { useCart } from '../context/cartContext';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const ProductDetail = ({route}) => {
  const {product} = route.params;
  console.log("Product details:", product); //Log de productgegevens naar de console
  const {image, name, description, price, id} = product; //Haal de productgegevens op uit de route parameters 

  const { addToCart } = useCart(); //Gebruik de addToCart functie uit de cartContext

  const [ quantity, setQuantity ] = useState(1); //Gebruik een state voor het productaantal

  const increaseQuantity = () => setQuantity(quantity + 1); //Verhoog het aantal
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); //Verlaag het aantal, maar niet lager dan 1
  }
};

//Functie om het product toe te voegen aan de winkelwagen
const handleAddToCart = () => {
  const productWithQuantity = { ...product, quantity }; //Voeg de hoeveelheid toe aan het product
  addToCart(productWithQuantity); //Voeg het product toe aan de winkelwagen
};

  return (
    <View style={styles.container}>
        <Image 
          source={image} style={styles.image}/>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.description}>{product?.subtitle}</Text>            
        <Text style={styles.price}>${price || "0.00"}</Text>
       

        <View style={styles.quantity}>
          <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      <Text style={styles.totalPrice}>Totaal: €{(price * quantity). toFixed(2)}</Text>

      {/* Knop om toe te voegen aan winkelmandje */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add To Cart</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

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
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#ffffff",
  },
  totalPrice: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4580ff",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 24,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#45ff45',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
