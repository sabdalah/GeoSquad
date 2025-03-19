import React, {useContext, useState, useEffect} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {Context as AuthContext} from '../context/AuthContext'
import {Context as DataContext} from '../context/DataContext'

const Login = (props) => {
    const {authState, signin} = useContext(AuthContext)
    const {fetchData} = useContext(DataContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        
    });

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const {
            email,
            password,
        } = formData;

        try {
            await signin({ email, password },fetchData)
        } catch (error) {
            Alert.alert("Error", error.message || "Signin failed, please try again.");
        }
    }


    return (
        <LinearGradient
            colors={['#5377AE', '#4C6EA0', '#4A6B9C', '#364E72', '#223148']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={{paddingTop: 50, fontSize: 60, fontWeight: 'bold', color: '#F3FA12'}}>GeoSquad</Text>
            </View>
                <View style={styles.middleContainer}>
                    <Text style={{alignSelf:'flex-start', paddingLeft: 45, color: 'white', fontSize: 15}}>Credentials</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        placeholderTextColor="#364E72"
                        onChangeText={(value) => handleInputChange("email", value)}
                        value={formData.firstName}
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD"
                        placeholderTextColor="#364E72"
                        onChangeText={(value) => handleInputChange("password", value)}
                        secureTextEntry
                        value={formData.lastName}
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={{color: "white", fontSize: 15}}>LOG IN</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', gap: 10, alignSelf: 'flex-start', paddingLeft: 45}}>
                        <Text style={{color:'white'}}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => {props.navigation.navigate("RegistrationScreen")}}>
                            <Text style={{color: "#A6D941",textDecorationLine: 'underline'}}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
                <TouchableOpacity style={{alignSelf:'flex-start', paddingLeft: 45, paddingBottom: 40}} onPress={() => {props.navigation.navigate("AboutUsScreen")}}>
                    <Text style={{color:'white'}}>
                        About Us
                    </Text>
                </TouchableOpacity>
            
            </View>
        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
    input: {
        width: "80%", 
        backgroundColor: "#A3D132",
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        color: "#223148",
    },
    loginButton: {
        width: "80%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"

    },
    container: {
        flex: 1,
      },
    topContainer: {
        alignItems: 'center', 
        paddingTop: 80,
         
    },

    middleContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20,
      },
})

Login.navigationOptions = () => {
    return {
        headerShown: false,
    }
}

export default Login;