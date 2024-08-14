// LoginHeader.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useContext } from "react";
import { UserContext } from "../context/userContext";

const LoginHeader = ({ onLoginPress }) => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLoginPress} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: StatusBar.currentHeight,
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 100,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    color: "blue",
  },
});

export default LoginHeader;
