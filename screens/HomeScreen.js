import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import ProductCard from "../components/ProductCard";
import {Picker} from '@react-native-picker/picker';

import tomnookpillow from "../images/tomnookpillow.png";
import pikachuplush from "../images/pokemonplush.png";
import zeldafigurine from "../images/zeldafigurine.png";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const categoryNames = {
  "": "Alle categorieën",
  "67c2e227cb5553738eb07ce9": "the sims",
  "67bf8c0e469bb8e53cb2d2e0": "the legend of zelda",
  "67bf813e465ad432c0ef9d92": "animal crossing",
  "67bf8080ae053bc9000e3945": "pokémon",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/67b09f6b8bdd71cbd0dff793/products",
      {
        headers: {
          Authorization:
            "Bearer 5a1303f6403fdde66e41c2889305f6e4990e53fbd11ac0f7bd8f49232fc457e8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => 
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
            category:
              categoryNames[item.product.fieldData.category[0]] || "Onbekend",
          }))
        )
      )
      .catch((err) => console.error("Error:", err));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
    (selectedCategory === "" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price; //prijs oplopend
    if (sortOption === "price-desc") return b.price - a.price; //prijs aflopend
    if (sortOption === "name-asc") return a.title.localeCompare(b.title); //naam a-z
    if (sortOption === "name-asc") return b.title.localeCompare(a.title); //naam z-a
  });

    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bekijk onze producten</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortOption}
          onValueChange={setSortOption}
          style={styles.picker}
        >
          <Picker.Item label="Prijs (laag-hoog)" value="price-asc" />
          <Picker.Item label="Prijs (hoog-laag)" value="price-desc" />
          <Picker.Item label="Naam A-Z" value="name-asc" />
          <Picker.Item label="Naam Z-A" value="name-desc" />
        </Picker>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Zoek op productnaam..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <Picker.Item label="Alle categorieën" value="" />
        {[...new Set(products.map((p) => p.category))].map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <ScrollView style={styles.cardContainer}>
        <View style={styles.row}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onPress={() => navigation.navigate("Details", { product })}
            />
          ))}
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 50,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput:{
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: 330,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default HomeScreen;