//Importeer React
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useWishlist } from '../context/wishlistContext';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

const WishlistScreen = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.item} key={item.id}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeFromWishlist(item.id)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Wishlist</Text>
            {wishlistItems.length > 0 ? (
                <FlatList
                    data={wishlistItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <View style={styles.emptyWishlistContainer}>
                    <Text style={styles.emptyWishlistText}>Your wishlist is empty 💔</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.goHomeButton}>
                        <Text style={styles.goHomeText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        backgroundColor: "#2f2f2f",
        flex: 1,
        padding: 16,
    },
    title:{
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    subtitle: {
        color: "#ffffff",
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 4,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    price: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
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
        backgroundColor: "red",
        padding: 4,
        borderRadius: 4,
        textAlign: "center",
   
        marginTop: 12,
        marginBottom: 8,
        width: 100,
    },
    removeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    emptyWishlistContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyWishlistText: {
        color: "#45ff45",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
    },
    goHomeButton: {
        backgroundColor: "#4580ff",
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    goHomeText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
export default WishlistScreen;
   