import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Context as DataContext } from "../context/DataContext";
import defaultAvatar from "../../assets/default-avatar.jpg";

const SquadScreen = () => {
  const { state } = useContext(DataContext);
  const members = Array.isArray(state.squad?.members) ? state.squad.members : [];
  
  const validMembers = members.filter(
    (member) => member.firstName && member.lastName
  );
  
  
  const squadCreator = validMembers.find(
    (member) => member.userType === "creator"
  );
  const regularMembers = validMembers.filter(
    (member) => member.userType !== "creator"
  );

  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Top Container */}
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {state.squad?.name || "Unnamed Squad"}
          </Text>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>
              Squad Created: {state.squad?.createdAt?.substring(0, 4) || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              User Count: {validMembers.length || 0}
            </Text>
            {state.user?.userType === "creator" && (
              <Text style={styles.infoText}>
                Invitation Code: {state.squad?.invitationCode || "N/A"}
              </Text>
            )}
          </View>
        </View>

        {/* Squad Creator Section */}
        {squadCreator && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Squad Creator</Text>
            <View style={styles.memberItem}>
              <Image
                source={squadCreator.avatar ? { uri: squadCreator.avatar } : defaultAvatar}
                style={styles.avatar}
              />
              <Text style={[styles.memberName, styles.creatorName]}>
                {`${squadCreator.firstName} ${squadCreator.lastName}`}
              </Text>
            </View>
          </View>
        )}

        {/* Regular Members Section */}
        {regularMembers.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Regular Members</Text>
            <FlatList
              data={regularMembers}
              keyExtractor={(item) =>
                item?._id ? item._id.toString() : item.id.toString()
              }
              renderItem={({ item }) => (
                <View style={styles.memberItem}>
                  <Image
                    source={item.avatar ? { uri: item.avatar } : defaultAvatar}
                    style={styles.avatar}
                  />
                  <Text style={styles.memberName}>
                    {`${item.firstName} ${item.lastName}`}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        {/* If there are no members */}
        {validMembers.length === 0 && (
          <Text style={styles.emptyText}>No Valid Members Found</Text>
        )}
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
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  infoText: {
    color: "white",
  },
  infoView: {
    width: "100%",
    gap: 20,
    paddingLeft: 30,
    marginTop: 20,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F3FA12",
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
    color: "white",
  },
  creatorName: {
    fontWeight: "bold",
    color: "#FFD700", // Highlight the creator name in gold
  },
  emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SquadScreen;
