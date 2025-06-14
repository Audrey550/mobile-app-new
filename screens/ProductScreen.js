import React, {useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";

//De categorienamen voor de producten
const categoryNames = {
  "": "Alle categorieën",
  "67c2e227cb5553738eb07ce9": "the sims",
  "67bf8c0e469bb8e53cb2d2e0": "the legend of zelda",
  "67bf813e465ad432c0ef9d92": "animal crossing",
  "67bf8080ae053bc9000e3945": "pokémon",
};

const ProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("price-asc");

    useEffect(() => {
        fetch(
            "https://api.webflow.com/v2/sites/67b09f6b8bdd71cbd0dff793/products",
            {
            headers: {
                Authorization:
                 "Bearer 5a1303f6403fdde66e41c2889305f6e4990e53fbd11ac0f7bd8f49232fc457e8",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setProducts(
                data.items.map((item) => ({
                    id: item.product.id,
                    title: item.product.fieldData.name,
                    subtitle: item.product.fieldData.description,
                    price: item.skus[0]?.fieldData.price.value / 100, // Price in USD, divided by 100 because the API gives the price in cents
                    image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
                    category: categoryNames[item.product.fieldData.category[0]] || "Onbekend",
                })));
                setLoading(false);
            })
        .catch((err) => console.error("Error:", err));
        }, []);

        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#45ff45" />
                    <Text style={styles.loadingText}>Loading products...</Text>
                </View>
            );
        }

        const filteredProducts = products?.filter((p) => selectedCategory === "" || p.category === selectedCategory);
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortOption === "price-asc") return a.price - b.price;
            if (sortOption === "price-desc") return b.price - a.price;
            if (sortOption === "name-asc") return a.title.localeCompare(b.title);
                if (sortOption === "name-desc") return b.title.localeCompare(a.title);
            });

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Alle Producten</Text>

                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={setSelectedCategory}
                    style={styles.picker}
                >
                    <Picker.Item label="Alle Categorieën" value="" />
                    {[...new Set(products.map((p) => p.category))].map((category, index) => (
                        <Picker.Item key={index} label={category} value={category} />
                    ))}
                </Picker>

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

                <FlatList
                    data={sortedProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <ProductCard
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            image={item.image}
                            price={item.price}
                            onPress={() => navigation.navigate("Details", { product: item })}
                        />
                    )}
                />
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#171717',
    },
    heading: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        backgroundColor: '#ffffff',
        borderRadius:10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717',
    },
    loadingText: {
        color: '#ffffff',
        marginTop: 10,
    },
});

export default ProductScreen;