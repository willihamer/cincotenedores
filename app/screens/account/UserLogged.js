import React, { useState, useEffect, useRef } from 'react'
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/account/InfoUser';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

export default function UserLogged({ navigation }) {

    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    }, [reloadData]);

    return (
        <View>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef} setIsLoading={setIsLoading} setTextLoading={setTextLoading} />
            <Button
                title="Cerrar Sesión"
                onPress={() => firebase.auth().signOut()}
            />
            <Loading text={textLoading} isVisible={isLoading} />
            <Toast position="center"
                opacity={0.5}
                ref={toastRef} />
        </View>
    );
}