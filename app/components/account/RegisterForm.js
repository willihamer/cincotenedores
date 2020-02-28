import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from '../../utils/Validation';

export default function RegisterForm() {

    const [hidePass, setHidePass] = useState(true);
    const [hidePassRepeat, setHidePassRepeat] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const register = () => {
        if (!email || !password || !repeatPass) {
            console.log("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                console.log("el email no es correcto");
            } else {
                if (password !== repeatPass) {
                    console.log("Las cotraseñas no son iguales");
                } else {
                    console.log("correcto");
                }

            }
        }




    }
    return (
        <View style={styles.formContainer} behavior="padding" enabled>
            <Input
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />

            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePass}
                containerStyle={styles.inputForm}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePass ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePass(!hidePass)}
                    />


                }
            />

            <Input
                placeholder="Repetir Contraseña"
                password={true}
                secureTextEntry={hidePassRepeat}
                containerStyle={styles.inputForm}
                onChange={(e) => setRepeatPass(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassRepeat ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassRepeat(hidePassRepeat)}
                    />
                }
            />



            <Button
                title='Unirse'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
        </View>
    );
    /* <MaterialCommunityIcons name="at" iconStyle /> */
}



const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight: {
        color: '#c1c1c1'
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "25%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    }
})