import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm';

export default function AddRestaurant({ navigation }) {
    console.log(navigation);
    const [isLoading, setIsLoading] = useState(false);

    const toastRef = useRef();
    return (
        <View>
            <AddRestaurantForm navigation={navigation} toastRef={toastRef} setIsLoading={setIsLoading} />
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading isVisible={isLoading} text="Creando Restaurante" />
        </View>
    );
}