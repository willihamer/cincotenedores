import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from "react-native-vector-icons";

import RestaurantsScreen from "../screens/Restaurants";
import TopRestaurantsScreen from "../screens/TopRestaurants";
import SearchScreen from "../screens/Search";
import MyAccountScreen from "../screens/account/MyAccount";
import Login from '../screens/account/Login';
import Register from '../screens/account/Register';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Restaurantes" component={RestaurantsScreen} />
            <Stack.Screen name="Restaurante" component={RestaurantsScreen} />
        </Stack.Navigator>
    )
}

function TopRestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Top 5" component={TopRestaurantsScreen} />
        </Stack.Navigator>
    )
}

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Buscar" component={SearchScreen} />
        </Stack.Navigator>
    )
}

function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mi cuenta" component={MyAccountScreen} />
            <Stack.Screen name="Registro" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}



export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Restaurantes" component={RestaurantsStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen name="Top Restaurantes" component={TopRestaurantsStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="silverware" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen name="Buscar" component={SearchStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen name="Cuenta" component={AccountStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        )
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}






