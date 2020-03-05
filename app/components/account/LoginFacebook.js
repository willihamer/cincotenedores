import React from 'react';
import { SocialIcon } from "react-native-elements";


export default function LoginFacebook() {

    const login = () => {

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