import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';

export default function Restaurants({ navigation }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        })
    }, [])

    return (
        <View style={styles.viewBody}>
            <Text>Estamos en Restaurantes</Text>
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