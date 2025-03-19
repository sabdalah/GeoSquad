import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const AboutUs = () => {
    return (
        <LinearGradient
            colors={['#5377AE', '#4C6EA0', '#4A6B9C', '#364E72', '#223148']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={{fontSize: 60, fontWeight: 'bold', color: '#F3FA12'}}>ABOUT US</Text>
                </View>
                
                <View style={{backgroundColor:'black', width: '75%', height: '35%', alignSelf: 'center', borderRadius: 20, marginTop: 50, justifyContent: 'center'}}>
                    <Text style={{color: 'white', alignSelf: 'center', fontSize: 18, textAlign: 'center',width: '90%'}}>This app is intended to make it easy for those in an area affected by a disaster, war zones, etc. to find safe passages, medical aid, water, and loved ones. It also allows for you to create a “circle” of people you can check-in with to mark that you are safe.</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 40, gap: 12}}>
                    <Text style={{color: 'white', fontSize:30}}>Developers</Text>
                    <Text style={styles.developers}>Victoria Pham</Text>
                    <Text style={styles.developers}>Rima Murad</Text>
                    <Text style={styles.developers}>Safa Abdalah</Text>
                    <Text style={styles.developers}>Jason Buras</Text>
                    <Text style={styles.developers}>Johny Lopez</Text>
                </View>
                
            </View>

        </LinearGradient>
        
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black'
    },
    topContainer: {
        alignItems: 'center', 
        paddingTop: 80,
         
    },
    developers: {
        fontSize: 18,
        color:'white'
    }
})

// AboutUs.navigationOptions = () => {
//     return {
//         headerShown: true,
//     }
// }


export default AboutUs