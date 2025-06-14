//Importeer React
import { StatusBar } from 'expo-status-bar';
import React, { use, useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import BlogCard from "../components/BlogCard";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const BlogDetail = ({route}) => {
    const {blog} = route.params;
    const {title, subtitle, image, content} = blog; //Haal de bloggegevens op uit de route parameters

    return (
        <View style={styles.container}>
            <Image 
                source={image} style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>  
            <ScrollView>         
            <Text style={styles.content}>{content}</Text>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    content: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 10,
    }
});

export default BlogDetail;