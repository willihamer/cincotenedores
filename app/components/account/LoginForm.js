import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import Loading from '../Loading';
import * as firebase from 'firebase';

export default function LoginForm({ toastRef, navigation }) {

    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);



    const login = async () => {
        setIsVisibleLoading(true);
        if (!email || !password) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show('El email no es correcto');
            } else {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => { navigation.navigate("MyAccount"); })
                    .catch(() => {
                        toastRef.current.show("Email o contraseña incorrectos");
                    })
            }
        }
        setIsVisibleLoading(false);
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconStyle}
                    />
                }
            />

            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={hidePass}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePass ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconStyle}
                        onPress={() => setHidePass(!hidePass)}
                    />
                }
            />
            <Button
                title="Ingresar"
                containerStyle={styles.btnContanierLogin}
                buttonStyle={styles.btnLogin}
                onPress={login}
            />
            <Loading
                isVisible={isVisibleLoading}
                text="Iniciando Sesión"
            />
        </View>
    );
}


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'cebter',
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    iconStyle: {
        color: "#c1c1c1"
    },
    btnContanierLogin: {

        marginTop: 20,
        width: "95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    }
})