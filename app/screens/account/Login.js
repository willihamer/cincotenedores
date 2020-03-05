import * as React from 'react';
import { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/account/LoginForm";
import Toast from 'react-native-easy-toast';
import LoginFacebook from "../../components/account/LoginFacebook";

export default function Login({ navigation }) {
    const toastRef = useRef();
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View
                style={styles.viewContainer}>
                <LoginForm toastRef={toastRef, navigation} />
                
                <CreateAccount navigation={navigation} />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.viewContainer}>
                <LoginFacebook/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.5} />
        </ScrollView>
    );
}


function CreateAccount(props) {
    const { navigation } = props;

    return (
        <Text style={styles.textRegister}>
            Aún no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Registro")}
            >
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    },
    textRegister: {
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    }
})