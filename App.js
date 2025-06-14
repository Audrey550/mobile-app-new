//Importeer React en de benodigde componenten voor navigatie en iconen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Importeer de schermen
import HomeScreen from "./screens/HomeScreen.js";
import CartScreen from "./screens/cartScreen.js";
import {CartProvider} from "./context/cartContext.js";
import ProductDetail from "./screens/ProductDetail.js";
import BlogDetail from "./screens/BlogDetail.js";
import ProductScreen from './screens/ProductScreen.js';
import WishlistScreen from './screens/WishlistScreen.js';
import { WishlistProvider } from './context/wishlistContext.js';

// Maak de navigatie stacks en tab navigators aan
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Defineer de bottom tab navigator met iconen voor elke tabblad
const BottomTabNavigator = () => {
  return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Products') {
          iconName = 'list';
        }
        else if (route.name === 'Wishlist') {
          iconName = 'heart';
        } else if (route.name === 'Cart') {
          iconName = 'cart';
        }
        return <Icon name={iconName} size={size} color={color} />;
      }
    })}
  >
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Products" component={ProductScreen} />
  <Tab.Screen name="Wishlist" component={WishlistScreen} />
  <Tab.Screen name="Cart" component={CartScreen} />
  </Tab.Navigator>
  );
}

//Hoofdcomponent van de app
export default function App() {
  return (
    //Omgeef de app met providers zodat de cart/wishlist overal beschikbaar is
    <CartProvider>
      <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" options={{headerShown: false}}>
          {() => (
            <BottomTabNavigator />
          )}
          </Stack.Screen>
          <Stack.Screen name="Products" component={ProductScreen} />
          <Stack.Screen name="Details" component={ProductDetail} />
          <Stack.Screen name="Blog" component={BlogDetail} />
        </Stack.Navigator>
      </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
}