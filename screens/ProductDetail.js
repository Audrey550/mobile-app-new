import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import ProductCard from "../components/ProductCard";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const DetailsScreen = ({route}) => {
  const { title, subtitle, price, image } = route.params;
  const [ quantity, setQuantity ] = useState(1); //Gebruik een state voor het productaantal

  const increaseQuantity = () => setQuantity(quantity + 1); //Verhoog het aantal
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); //Verlaag het aantal, maar niet lager dan 1
  }
};

  return (
    <View style={styles.container}>
        <Image 
          source={image} style={styles.image}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>            
        <Text style={styles.price}>€{price}</Text>

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

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    width: "80%",
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
  },
  button: {
    backgroundColor: "#90EE90",
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
  },
  quantityText: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});

export default DetailsScreen;
