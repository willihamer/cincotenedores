import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'

export default function InfoUser({ userInfo, setReloadData, toastRef, setTextLoading, setIsLoading }) {

    const { photoURL, uid, displayName, email } = userInfo;

    const changeAvatar = async () => {
        const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermCamera = resultPermision.permissions.cameraRoll.status;

        if (resultPermCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria.")
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show("Has cerrado la galería de imagenes")
            } else {
                uploadImage(result.uri, uid).then(() => {
                    updatePhotoUrl(uid);
                });
            }
        }

    }

    const uploadImage = async (uri, nameImage) => {
        setTextLoading('Actualizando Avatar');
        setIsLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`/avatar/${nameImage}`);
        return ref.put(blob);
    }

    const updatePhotoUrl = (uid) => {
        firebase.storage().ref(`avatar/${uid}`)
            .getDownloadURL().then(async result => {
                const update = {
                    photoURL: result
                }
                await firebase.auth().currentUser.updateProfile(update);
                setReloadData(true);
                setIsLoading(false);
            }).catch(() => {
                toastRef.current.show("error al recuperar el avatar en el servidor");
            });
    }

    // const imageDefault = () => {
    //     firebase.storage().ref('default/ironman').getDownloadURL().then(async result => {
    //         const update = {
    //             photoURL: result
    //         }
    //         await firebase.auth().currentUser.updateProfile(update);
    //         setReloadData(true);
    //     }).catch(() =>{
    //         console.log('la cagates');
    //     })
    // }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri: photoURL ? photoURL : 'https://img.zi.com/images/2017/3/4/upload/d1e72007-955d-402b-8fb0-19d4c2f5c599.jpg'
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