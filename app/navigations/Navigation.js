import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "react-native-vector-icons";

import RestaurantsScreen from "../screens/Restaurants";
import TopRestaurantsScreen from "../screens/TopRestaurants";
import SearchScreen from "../screens/Search";
import MyAccountScreen from "../screens/account/MyAccount";
import LoginScreen from '../screens/account/Login';
import Register from '../screens/account/Register';
import UserGuest from '../screens/account/UserGuest';


const Tab = createBottomTabNavigator();
const StackRestaurant = createStackNavigator();

function RestaurantsStack() {
    return (
        <StackRestaurant.Navigator>
            <StackRestaurant.Screen name="Restaurantes" component={RestaurantsScreen}  options={{ title: 'Restaurantes' }} />
            <StackRestaurant.Screen name="Restaurante" component={RestaurantsScreen}  options={{ title: 'Restaurante' }}/>
        </StackRestaurant.Navigator>
    )
}

const StackTopRestaurants = createStackNavigator();

function TopRestaurantsStack() {
    return (
        <StackTopRestaurants.Navigator>
            <StackTopRestaurants.Screen name="Top 5" component={TopRestaurantsScreen} options={{ title: 'Restaurantes top 5' }}/>
        </StackTopRestaurants.Navigator>
    )
}


const StackSearch = createStackNavigator();

function SearchStack() {
    return (
        <StackSearch.Navigator>
            <StackSearch.Screen name="Buscar" component={SearchScreen} options={{ title: 'Buscar' }}/>
        </StackSearch.Navigator>
    )
}

const StackAccount = createStackNavigator();


function AccountStack() {
    return (
        <StackAccount.Navigator>
            <StackAccount.Screen name="MyAccount" component={MyAccountScreen} options={{ title: 'Mi cuenta' }} />
            <StackAccount.Screen name="UserGuest" component={UserGuest} options={{ title: 'Cuenta' }}/>
            <StackAccount.Screen name="Login" component={LoginScreen} options={{ title: 'Ingresar' }} />
            <StackAccount.Screen name="Registro" component={Register} options={{ title: 'Registrar' }} />
        </StackAccount.Navigator>
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