import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from "./screens/HomeScreen.js";
import CartScreen from "./screens/cartScreen.js";
import {CartProvider} from "./context/cartContext.js";
import ProductDetail from "./screens/ProductDetail.js";
import BlogDetail from "./screens/BlogDetail.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Cart') {
              iconName = 'cart';
            }
            return <Icon name={iconName} size={size} color={color} />;
          }
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}