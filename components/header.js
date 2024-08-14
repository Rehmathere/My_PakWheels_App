import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import backArrow from "../assets/back-arrow.png";

const Header = ({ title, onPressBack }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#bd2a2a" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Image
            source={require("../assets/back-arrow.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fc6f03",
    // paddingTop: StatusBar.currentHeight - 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bd2a2a",
    paddingVertical: 5,
  },
  backButton: {
    tintColor: "white",
    marginLeft: 5,
  },
  backImage: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1, // To make the title take up remaining space
  },
});

export default Header;
