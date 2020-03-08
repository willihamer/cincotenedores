import React, { useState, Fragment } from 'react';
import { SocialIcon } from "react-native-elements";
import * as firebase from 'firebase';
import * as facebook from 'expo-facebook';
import { FacebookApi } from "../../utils/Social";
import Loading from '../Loading';


export default function LoginFacebook({ toastRef, navigation }) {

    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        const { type, token } = await facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            { permissions: FacebookApi.permissions }
        );

        if (type === "success") {
            setIsLoading(true);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase.auth()
                .signInWithCredential(credentials)
                .then(() => {
                    navigation.navigate('MyAccount');
                })
                .catch(() => {
                    toastRef.current.show('Error accediendo con Facebook');
                });
        } else if (type === "cancel") {
            toastRef.current.show('Inicio de sesión cancelado');

        } else {
            toastRef.current.show('Error desconocido, intentelo más tarde');
        }

        setIsLoading(false);
    }
    return (
        <>
            <SocialIcon
                title="Iniciar Sesión con Facebook"
                button
                type="facebook"
                onPress={login}
            />
            <Loading isVisible={isLoading} text="Iniciando sesión" />
        </>
    );
}