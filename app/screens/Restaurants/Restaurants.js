import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import ListRestaurants from '../../components/restaurants/ListRestaurants';
import { firebaseApp } from "../../utils/FireBase";
import firebase from 'firebase/app';
import "firebase/firestore";


const db = firebase.firestore(firebaseApp);

export default function Restaurants({ navigation }) {
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const limitRestaurants = 8;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        })
    }, []);

    useEffect(() => {
        db.collection("restaurants").get().then((snap) => {
            setTotalRestaurants(snap.size);
        });

        (async () => {
            let resultRestaurants = [];
            const restaurants = db.collection('restaurants').orderBy('createAt', "desc").limit(limitRestaurants);
            await restaurants.get().then(response => {
                setStartRestaurants(response.docs[response.docs.length - 1]);

                response.forEach(doc => {
                    let restaurant = doc.data;
                    restaurant.id = doc.id;
                    resultRestaurants.push({ restaurant });

                });
                setRestaurants(resultRestaurants);
            });
        })();

    }, [])

    return (
        <View style={styles.viewBody}>
            <ListRestaurants restaurants={restaurants} />
            {user && <AddRestaurantButton navigation={navigation} />}
        </View>
    )
}

function AddRestaurantButton({ navigation }) {
    return (
        <ActionButton
            buttonColor="#00a680"
            onPress={() => navigation.navigate('addRestaurant')}
        />
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
})