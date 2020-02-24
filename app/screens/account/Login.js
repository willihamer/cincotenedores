import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image, View } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation";

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View
                style={styles.viewContainer}>
                <Text>Form Login...</Text>
                <Text>Create Account...</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.viewContainer}>
                <Text>LoginFace...</Text>
            </View>
        </ScrollView>
    );
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
    }
})