import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Context as DataContext } from "../context/DataContext";

const capitalizeFirstLetter = (string) => {
  if (!string) return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const ProfileScreen = () => {
  const { state } = useContext(DataContext);
  

  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.imagePlaceholder} />
          <Text style={styles.name}>
            {state.user.firstName} {state.user.lastName}
          </Text>

          {/* Additional Information Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>User Type:</Text>{" "}
              {capitalizeFirstLetter(state.user.userType)}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Location:</Text>{" "}
              {state.user.location || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Age:</Text> {state.user.age || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Birthday:</Text>{" "}
              {state.user.dob || "N/A"}
            </Text>

            {/* Entries Information */}
            <Text style={styles.infoText}>
              <Text style={styles.label}>Entries Made:</Text>{" "}
            </Text>
            {state.user.entries.length > 0 ? (
              state.user.entries.map((entry, index) => (
                <Text key={index} style={styles.entryText}>
                  {state.user.firstName} {state.user.lastName} marked {entry.type} on {entry.date}.
                </Text>
              ))
            ) : (
              <Text style={styles.entryText}>No entries made yet.</Text>
            )}
          </View>
        </View>
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
    marginLeft: 30,
    alignSelf: "flex-start",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    borderWidth: 2,
    borderColor: "#F3FA12",
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#364E72",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  infoText: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#F3FA12",
  },
  entryText: {
    fontSize: 16,
    color: "white",
    marginTop: -2,
  },
});

export default ProfileScreen;
