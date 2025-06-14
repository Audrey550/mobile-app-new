//Importeer React en componenten van React Native en React Navigation
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWishlist } from "../context/wishlistContext";

//Component voor het tonen van een productkaart
const ProductCard = ({title, subtitle, image, price, id, onPress}) => {
    const navigation = useNavigation(); //Navigatiehook voor doorklikken naar detailpagina
    const { addToWishlist } = useWishlist(); //Contextfunctie om product toe te voegen aan de verlanglijst

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="contain"/>
            </View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>{subtitle}</Text>            
            <Text style={styles.price}>${price || "0.00"}</Text>

            {/* Add to Wishlist knop */}
            <TouchableOpacity
                style={styles.wishlistButton}
                onPress={() => addToWishlist({ id, title, subtitle, image, price })}>
                <View>
                <Text style={styles.wishlistButtonText}>🩷 </Text>
                </View>
            </TouchableOpacity> 

            {/* Details knop */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Details", { product: { id, title, subtitle, image, price } })}>
                <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
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

/*Stijlen voor de productkaart en zijn onderdelen */
const styles = StyleSheet.create({
    card: {
        width: 150,
        padding: 8,
        backgroundColor: "#2f2f2f",
        borderRadius: 8,
        marginBottom: 4,
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    name: {
        color:"#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#00FF00",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 8,
    },
    buttonText: {
        color: "#000000",
        fontWeight: "bold",
    },
    wishlistButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 8,
        width: "auto",
    },
    wishlistButtonText: {
        fontSize: 20,
        letterSpacing: 20, //Zorg voor voldoende ruimte rondom de emoji
        textAlign: "center",
        includeFontPadding: false,
    }
});

export default ProductCard;