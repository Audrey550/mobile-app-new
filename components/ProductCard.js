import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ProductCard = ({title, subtitle, image, price, onPress}) => {
    const navigation = useNavigation();

    return (
        <View style={StyleSheet.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="contain"/>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>            
            <Text style={styles.price}>€{price}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}>
                <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        padding: 8,
        backgroundColor: "#fff",
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
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#000000",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 4,
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
});

export default ProductCard;