import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import iconavatar from '../../../assets/img/ironman.jpg';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'

export default function InfoUser({ userInfo }) {

    const { photoURL, uid, displayName, email } = userInfo;

    const changeAvatar = async () => {
        const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermCamera = resultPermision.permissions.cameraRoll.status;

        if (resultPermCamera === "denied") {
            // es necesario aceptar los permisos de la galeria.
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                console.log("Has cerrado la galería de imagenes");
            } else {
                uploadImage(result.uri, uid); 
            }
        }

    }

    const uploadImage = (uri, nameImage) => {

    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri: photoURL ? photoURL : iconavatar
                }}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : "Anonimo"}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    displayName: {
        fontWeight: "bold"
    }
})