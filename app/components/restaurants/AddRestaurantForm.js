import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import Modal from "../Modal";
import uuid from 'uuid/v4';
import { firebaseApp, firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widtScreen = Dimensions.get("window").width;

export default function AddRestaurantForm({ navigation, toastRef, setIsLoading }) {

    const [imagesSelected, setImagesSelected] = useState([]);

    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddres, setRestaurantAddres] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);

    const addRestaurant = () => {
        if (!restaurantName || !estaurantAddres || !restaurantDescription) {
            toastRef.current.show("Todos los campos del formulario son obligatorios.");
        } else if (imagesSelected.length === 0) {
            toastRef.current.show("El restaurante debe tener por lo menos una foto");
        } else if (!locationRestaurant) {
            toastRef.current.show("debes localizar el restaurante en el mapa")
        } else {
            setIsLoading(true);
            uploadImageStorage(imagesSelected).then(
                arrayImages => {
                    db.collection("restaurants").add({
                        name: restaurantName,
                        address: restaurantAddres,
                        location: locationRestaurant,
                        images: arrayImages,
                        rating: 0,
                        ratingTotal: 0,
                        quantityVoting: 0,
                        createAt: new Date(),
                        createdBy: firebaseApp.auth().currentUser.uid

                    }).then(() => {
                        setIsLoading(false);
                        navigation.navigate("Restaurants");
                    }).catch(() => {
                        setIsLoading(false);
                        toastRef.current.show("Error al subir el restaurante, intentelo más tarde");
                    })
                }
            );
            setIsLoading(false);


        }
    }

    const uploadImageStorage = async (imageArray) => {
        const imageBlob = [];

        await Promise.all(
            imageArray.map(async image => {
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref("resturant-images").child(uuid());

                await ref.put(blob).then(result => {
                    imageBlob.push(result.metadata.name);
                })
            })
        );

        return imageBlob;

    }

    return (
        <ScrollView>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddres={setRestaurantAddres}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}

            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}

            />
        </ScrollView>
    )

}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            {imageRestaurant ? (
                <Image
                    source={{ uri: imageRestaurant }}
                    style={{ width: widtScreen, height: 200 }}
                />
            ) : (
                    <Image
                        source={require("../../../assets/img/noImage.png")}
                        style={{ width: widtScreen, height: 200 }}
                    />
                )}
        </View>
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

    const removeImage = image => {
        const arrayImages = imagesSelected;
        Alert.alert(
            "Eliminar imagen",
            "Estás seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))
                }

            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.viewImages}>

            {imagesSelected.length < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={() => imageSelect()}
                />
            )}


            {imagesSelected.map((imageRestaurant, index) => (
                <Avatar
                    key={index}
                    onPress={() => removeImage(imageRestaurant)}
                    style={styles.miniatureStyle}
                    source={{ uri: imageRestaurant }}
                />
            ))}


        </View>
    );
}

function FormAdd({ setRestaurantName, setRestaurantAddres, setRestaurantDescription, setIsVisibleMap, locationRestaurant }) {

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Restaurante"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />

            <Input
                placeholder="Direccion del Restaurante"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
                onChange={(e) => setRestaurantAddres(e.nativeEvent.text)}
            />

            <Input
                placeholder="Descripción del Restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />


        </View>
    )
}

function Map({ isVisibleMap, setIsVisibleMap, SetLocationRestaurant, toastRef }) {
    const [location, setLocation] = useStatte(null);

    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);

            const statusPermissions = resultPermission.permissions.location.status;

            if (statusPermissions !== "granted") {
                toastRef.current.show("Tienes que aceptar los permisos de localización", 3000);
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })();
    }, []);

    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show("Localización guardada Correctamente");
        setIsVisibleMap(false);
    }

    return (
        <Modal isVisible={isVisibleMap} setisVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyles}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={region => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicación"
                        onPress={confirmLocation}
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    />

                    <Button
                        title="Cancelar"
                        onPress={() => setIsVisibleMap(false)}
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                    />
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
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
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    mapStyles: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680",
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5

    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    }
});