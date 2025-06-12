import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({ title, subtitle, image, onPress }) => {
    const navigation = useNavigation(); 

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>            

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}>
                <Text style={styles.buttonText}>Read More</Text>
            </TouchableOpacity>
        </View>
    );
}