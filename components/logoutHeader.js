// LogoutHeader.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

const LogoutHeader = ({
  username,
  onViewProfilePress,
  onLogoutPress,
  onLoginPress,
}) => {
  return (
    <TouchableOpacity onPress={onLoginPress} style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.usernameText}>{username}</Text>
        <TouchableOpacity onPress={onViewProfilePress}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onLogoutPress}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#bd2a2a",
    padding: 50 + StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "space-between", // Align items horizontally with space between
    alignItems: "center",
  },
  userInfo: {
    marginTop: 50,
    flexDirection: "column", // Arrange username and view profile button vertically
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  viewProfileText: {
    fontSize: 12,
    color: "white",
    textDecorationLine: "underline",
  },
  logoutText: {
    marginTop: 50,
    fontSize: 14,
    color: "white",
  },
});

export default LogoutHeader;
