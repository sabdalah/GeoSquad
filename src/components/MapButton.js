import React from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'


const MapButton = (props) => {

    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.innerContainer}>
                <Image style={styles.icon} source={props.icon}/>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      innerContainer: {
        height: "100%",
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: "black", 
        paddingHorizontal: 5, 
        paddingVertical: 5, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        marginBottom: 5
      },

      text: {
        fontSize: 10,
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 90
      },
})

export default MapButton