import React, { useState, useEffect } from 'react'
import * as firebase from "firebase";
import { View, Text } from 'react-native';

export default function MyAccount() {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            !user ? setLogin(false) : setLogin(true);
        })
    }, []);


    if (login === null) {
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        );
    }

    if(login) {
        return (
            <View>
                <Text>Usuario logueado</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Usuario No logueado</Text>
            </View>
        );
    }

    

}

