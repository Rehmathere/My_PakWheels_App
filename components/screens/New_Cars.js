import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import axios from "axios";
import SyncStorage from "sync-storage"; // Import SyncStorage for checking login status
import { UserContext } from "../../context/userContext"; // Import UserContext for user data
import SearchBar from "../searchBar";

const New_Cars = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Get user data from context

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRentABike = () => {
    if (SyncStorage.get("token")) {
      navigation.navigate("Auto_Parts_Post");
    } else {
      navigation.navigate("welcome");
    }
  };
  // ---  Get Single Car Data  ---
  const handleSingleCarData = () => {
    navigation.navigate("New_Cars_Details");
  };
  // ---  Get Single Car Data  ---

  // Main Body
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* - */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Cars</Text>
        </View>
      </View>
      {/* - Search Bar - */}
      <View style={styles.rowContainer}>
        {/* Search bar */}
        <View style={styles.SearchBar}>
          {/* Your search bar component goes here */}
          <SearchBar />
        </View>
      </View>
      {/* - Search Bar - */}
      <View style={styles.Container_Sub}>
        {/* Body */}
        {/* --- Get Single Data --- */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={handleSingleCarData}
        >
          <Text style={styles.buttonText}>Get Single New Car Data</Text>
        </TouchableOpacity>
        {/* --- Get Single Data --- */}
      </View>
      <View style={styles.button_Parent}>
        <TouchableOpacity style={styles.button} onPress={handleRentABike}>
          <Text style={styles.buttonText}>Post Your Auto Parts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
    marginLeft: 5,
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Container_Sub: {
    flex: 1,
    // backgroundColor: "lightgreen",
  },
  button_Parent: {
    // borderWidth: 0.5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    // marginTop: 20,
  },
  featuredIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bd2a2a",
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  upperView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 12,
  },
  rowContainer: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 10,
  },
  SearchBar: {
    alignSelf: "center",
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    paddingHorizontal: 1,
    width: "90%",
    borderColor: "transparent",
    marginHorizontal: 20,
  },
});

export default New_Cars;
