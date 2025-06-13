import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const BlogCard = ({ title, subtitle, image, publishDate, onPress }) => {
    const navigation = useNavigation();

    //Formateer de publicartiedatum
    const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString("nl-NL", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }) 
    : "Onbekend";

    return (
        <View style={StyleSheet.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="contain"/>
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
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#000000",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
    },
});

export default BlogCard;