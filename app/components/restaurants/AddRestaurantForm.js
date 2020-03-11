import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';



export default function AddRestaurantForm({ navigation, toastRef, setIsLoading }) {

    const [imagesSelected, setImagesSelected] = useState([]);



    return (
        <ScrollView>
            <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} toastRef={toastRef} />
        </ScrollView>
    )

}

function UploadImage({ imagesSelected, setImagesSelected, toastRef }) {

    const imageSelect = async () => {
        console.log("im here");
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === 'denied') {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria", 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show("Has cancelado la selección de imagenes", 3000);
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    }

    return (
        <View style={styles.viewImages}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={() => imageSelect()}
            />
            <Avatar
                onPress={() => console.log("eliminar")}
                style={styles.miniatureStyle}
            // source={{}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }
});