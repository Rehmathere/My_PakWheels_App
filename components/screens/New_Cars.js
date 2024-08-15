import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from react-navigation
import axios from "axios";
import SyncStorage from "sync-storage"; // Import SyncStorage for checking login status
import { UserContext } from "../../context/userContext"; // Import UserContext for user data
import SearchBar from "../searchBar";

const New_Cars = () => {
  // --- My API Data ---
  const navigation = useNavigation();

  const [car1, setCar1] = useState({ year: "", make: "", model: "" });
  const [car2, setCar2] = useState({ year: "", make: "", model: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, value, carNumber) => {
    if (carNumber === 1) {
      setCar1({ ...car1, [name]: value });
    } else {
      setCar2({ ...car2, [name]: value });
    }
  };

  const handleSubmit = async (path) => {
    const data = { car1, car2 };
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://autofinder-backend.vercel.app/api/newCar/compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data successfully posted");
        navigation.navigate(path);
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error("Error posting data", error);
    } finally {
      setIsLoading(false);
    }
  };
  // --- My API Data ---
  const { user } = useContext(UserContext); // Get user data from context

  const handleBack = () => {
    navigation.goBack();
  };
  // Main Body
  return (
    <ScrollView style={styles.container}>
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
        {/* --- API Body --- */}
        <Text style={styles.heading}>Cars Comparison</Text>
        <View style={styles.box}>
          <View style={styles.boxSub}>
            <Text style={styles.subHeading}>Car 1 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              keyboardType="numeric"
              value={car1.year}
              onChangeText={(text) => handleInputChange("year", text, 1)}
            />
            <TextInput
              style={styles.input}
              placeholder="Make"
              value={car1.make}
              onChangeText={(text) => handleInputChange("make", text, 1)}
            />
            <TextInput
              style={styles.input}
              placeholder="Model"
              value={car1.model}
              onChangeText={(text) => handleInputChange("model", text, 1)}
            />
            <Text style={styles.subHeading}>Car 2 :</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              keyboardType="numeric"
              value={car2.year}
              onChangeText={(text) => handleInputChange("year", text, 2)}
            />
            <TextInput
              style={styles.input}
              placeholder="Make"
              value={car2.make}
              onChangeText={(text) => handleInputChange("make", text, 2)}
            />
            <TextInput
              style={styles.input}
              placeholder="Model"
              value={car2.model}
              onChangeText={(text) => handleInputChange("model", text, 2)}
            />
          </View>
        </View>
        {/* --- API Body --- */}
      </View>
      <View style={styles.button_Parent}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handleSubmit("New_Cars_Details")}
        >
          <Text style={styles.buttonText_1}>Compare Cars</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  buttonText_1: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1.5,
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 15,
  },
  box: {
    paddingHorizontal: 30,
    paddingVertical: 3,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  boxSub: {
    marginBottom: 1,
  },
  subHeading: {
    // borderWidth: 0.5,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    paddingTop: 8,
    paddingBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default New_Cars;
