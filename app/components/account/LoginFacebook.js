import React from 'react';
import { SocialIcon } from "react-native-elements";
import * as firebase from 'firebase';
import * as facebook from 'expo-facebook';
import { FacebookApi } from "../../utils/Social";
import Loading from '../Loading';


export default function LoginFacebook() {

    const login = async () => {
        const { type, token } = await facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            { permissions: FacebookApi.permissions }
        );

        if (type === "success") {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase.auth()
                .signInWithCredential(credentials)
                .then(() => {

                })
                .catch(() => {

                });
        } else if (type === "cancel") {
            console.log("inicio de sesion cancelado");

        } else {
            console.log("error desconocido");
        }
    }
    return (
        <SocialIcon
            title="Iniciar Sesión con Facebook"
            button
            type="facebook"
            onPress={login}
        />
    );
}