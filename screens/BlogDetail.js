import { StatusBar } from 'expo-status-bar';
import React, { use, useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import BlogCard from "../components/BlogCard";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const BlogDetail = ({route}) => {
    const {blogId} = route.params;
    const {title, subtitle, image, content} = route.params.blog; //Haal de bloggegevens op uit de route parameters

    return (
        <View style={styles.container}>
            <Image 
                source={image} style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>            
            <Text style={styles.content}>{content}</Text>

            <StatusBar style="auto" />
        </View>
    );
}

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
        color: "#666",
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    }
});

export default BlogDetail;