//importeer React en react-native componenten
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Component die één blog-item weergeeft in kaartvorm
const BlogCard = ({ title, subtitle, image, publishDate, onPress }) => {
    const navigation = useNavigation();

    //Formateer de publicartiedatum naar bijvoorbeeld "01-01-2023"
    const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString("nl-NL", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }) 
    : "Onbekend"; //Fallback als de datum ontbreekt

    return (
        <View style={StyleSheet.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover"/>
            </View>

            {/* numberOfLines is een prop om de titel af te kappen als deze te lang is */}
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{formattedDate}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>

            {/*Lees meer knop*/}
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}>
                <Text style={styles.buttonText}>Lees meer</Text>
            </TouchableOpacity>
        </View>
    );
}

//Stijlobject voor visuele opmaak van de kaart 
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
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        marginTop: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#00bfff",
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

export default BlogCard;