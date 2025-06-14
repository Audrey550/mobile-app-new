import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useCart } from '../context/cartContext';
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import {Picker} from "@react-native-picker/picker";

import tomnookpillow from "../images/tomnookpillow.png";
import pikachuplush from "../images/pokemonplush.png";
import zeldafigurine from "../images/zeldafigurine.png";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//De categorienamen voor de producten
const categoryNames = {
  "": "Alle categorieën",
  "67c2e227cb5553738eb07ce9": "the sims",
  "67bf8c0e469bb8e53cb2d2e0": "the legend of zelda",
  "67bf813e465ad432c0ef9d92": "animal crossing",
  "67bf8080ae053bc9000e3945": "pokémon",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [loading, setLoading] = useState(true);

  //Haal de productdata op 
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
      .then((data) => {
        setProducts(
          data.items.map((item) => {
            if(!item.product.id) {
              console.error("Product ID ontbreekt:", item);
            }

            const priceInUSD = item.skus[0]?.fieldData.price.value / 100; //Prijs in USD, gedeeld door 100 omdat de API de prijs in centen geeft
            return {
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: priceInUSD,
            image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
            category:
              categoryNames[item.product.fieldData.category[0]] || "Onbekend",
          };
        })
      );
      })
      .catch((err) => console.error("Error:", err));

    //Haal de blogdata op
    fetch(
      "https://api.webflow.com/v2/sites/67b09f6b8bdd71cbd0dff793/collections/67bb65b5de30948f36de87c8/items",
      {
        headers: {
          Authorization:
          "Bearer 6f97acd5d1686eed67de72234f01dcda9caae49910b3fa2357439cbb7cbab51e",
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      if(data?.items && Array.isArray(data.items)) { //Check of de data.items een array is
      setBlogs(data.items.map((item) => ({
        id: item.id,
        title: item.fieldData.name,
        summary: item.fieldData["post-summary"],
        image: { uri: item.fieldData["main-image"]?.url},
        content: item.fieldData["post-body"],
        publishDate: item.fieldData["publish-date"],
      })));

      } else {
        console.error("Invalid blog data format:", data);
      }

      setLoading(false); //zet de Loading op false nadat de blogs zijn geladen
    })
    .catch((err) => console.error("Error:", err));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  //Filter de producten op basis van zoekopdracht en categorie
  const filteredProducts = products?.filter(
    (p) =>
    (selectedCategory === "" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  //Sorteer de producten
  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price; //prijs oplopend
    if (sortOption === "price-desc") return b.price - a.price; //prijs aflopend
    if (sortOption === "name-asc") return a.title.localeCompare(b.title); //naam a-z
    if (sortOption === "name-desc") return b.title.localeCompare(a.title); //naam z-a
  });

    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gear Up. Game On!</Text>
      { /* Navigatieknop naar de Productenpagina */}
      <TouchableOpacity style={styles.productButton} onPress={() => navigation.navigate("Products")}>
        <Text style={styles.productButtonText}>Bekijk alle producten</Text>
      </TouchableOpacity>

      

      {/* Zoekfunctie */}
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek op productnaam..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Weergave van de Producten en Blogs */}
      <ScrollView style={styles.cardContainer}>

        { /* Producten Sectie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Products</Text>
          <View style={styles.row}>
            {sortedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                subtitle={product.subtitle}
                image={product.image}
                price={product.price}
                onPress={() => navigation.navigate("Details", { product })}
              />
            ))}
          </View>
        </View>

      {/*Blogs Sectie*/}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Check out our blog</Text>
        <View style={styles.row}>
      {blogs?.map((blog) => {
        return (
        <BlogCard
          key={blog.id}
          title={blog.title}
          subtitle={blog.summary}
          image={blog.image}
          publishDate={blog.publishDate}
          onPress={() => navigation.navigate("Blog", { blogId: blog.id, blog: blog })}
        />
      );
      })}
        </View>
      </View>
      </ScrollView>
      <StatusBar style="auto" />
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
    flex: 1,
    backgroundColor: '#171717',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color:"#ffffff",
  },
  searchInput:{
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: 330,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#ffffff",
  },
  cardContainer: {
    backgroundColor: "#2f2f2f",
    width: "100%",
    paddingHorizontal: 25,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    marginTop: 16,
    textAlign: "center",
  },
  card: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#2f2f2f",
    borderRadius: 8,
  },
  productButton: {
    backgroundColor: "#45ff45",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  productButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
export { ProductCard };