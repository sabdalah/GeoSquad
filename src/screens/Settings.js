import React, {useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Context as AuthContext} from '../context/AuthContext'
import {Context as DataContext} from '../context/DataContext'

const SettingsScreen = () => {

  const {signout} = useContext(AuthContext)
  const {clear} = useContext(DataContext)
  

  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.signoutButton} onPress={() => {signout(clear)}}>
          <Text style={{color: "white", fontSize: 15}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
    paddingTop: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F3FA12",
    alignSelf: 'flex-start',
    marginLeft: 30,
    
  },
  signoutButton: {
    width: "80%",
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    alignSelf: 'center'
  },
});

export default SettingsScreen;
