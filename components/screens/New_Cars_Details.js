import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Linking,
  ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";
import call from "react-native-phone-call";
import { UserContext } from "../../context/userContext";
import FooterContact from "../footerContact";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import New_Cars_Detail_F from "./New_Cars_Detail_F";
import New_Cars_Detail_S from "./New_Cars_Detail_S";

const TopTab = createMaterialTopTabNavigator();

export default function New_Cars_Details() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFeature = () => {
    console.log("Car is Featured");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#bd2a2a"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Cars Details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/featured.png")}
            style={styles.image}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleFeature}>
              <Image
                source={require("../../assets/featured.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageCount}>
            <Text style={styles.imageCountText}>images.length</Text>
          </View>
          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.navigationButton}>
              <Image
                source={require("../../assets/previous.png")}
                style={styles.navigationButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
              <Image
                source={require("../../assets/next.png")}
                style={styles.navigationButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.carNameText}>Make</Text>
        <Text style={styles.priceText}>Model</Text>
        <Text style={styles.locationText}>Year</Text>

        <View style={styles.tabContainer}>
          <TopTab.Navigator>
            {/* Screen 1 */}
            <TopTab.Screen
              name="Specifications"
              component={New_Cars_Detail_S}
              options={{
                tabBarLabel: "Specifications",
                tabBarLabelStyle: {
                  fontFamily: "Heebo",
                  letterSpacing: 0.8,
                },
                tabBarInactiveTintColor: "grey",
                tabBarIndicatorStyle: {
                  backgroundColor: "#EB2F06",
                  borderWidth: 1.4,
                  borderColor: "#EB2F06",
                },
                tabBarActiveTintColor: "#EB2F06",
              }}
            />
            {/* Screen 2 */}
            <TopTab.Screen
              name="Features"
              component={New_Cars_Detail_F}
              options={{
                tabBarLabel: "Features",
                tabBarLabelStyle: {
                  fontFamily: "Heebo",
                  letterSpacing: 0.8,
                },
                tabBarInactiveTintColor: "grey",
                tabBarIndicatorStyle: {
                  backgroundColor: "#EB2F06",
                  borderWidth: 1.4,
                  borderColor: "#EB2F06",
                },
                tabBarActiveTintColor: "#EB2F06",
              }}
            />
          </TopTab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
}

// CSS
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
  scrollContainer: {
    paddingBottom: 20, // Optional padding for extra space at the bottom
  },
  imageContainer: {},
  image: {
    height: 300,
    width: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  // New styles for individual score container
  scoreContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    marginRight: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  scoreHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  scoreText: {
    fontSize: 12,
    color: "#2884ec",
  },
  imageCountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    marginBottom: 130,
  },
  navigationButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    padding: 10,
  },
  navigationButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  carNameText: {
    marginTop: 10, // Adjust margin top as needed
    marginLeft: 10,
    color: "#bd2a2a",
    fontSize: 14, // Adjust font size as needed
  },
  priceText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "black",
    fontSize: 18, // Adjust font size as needed
    fontWeight: "bold",
  },
  locationText: {
    marginTop: 5, // Adjust margin top as needed
    marginLeft: 10,
    color: "grey", // Adjust color as needed
    fontSize: 14, // Adjust font size as needed
  },
  specsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  specItem: {
    alignItems: "center",
  },
  specIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: "#bd2a2a",
  },
  specName: {
    fontSize: 12,
    color: "grey", // Adjust color as needed
  },

  carDetailContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  carDetailHeader: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  carDetailHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  carDetailContent: {
    flexDirection: "column",
  },
  My_Heading_E: {
    borderWidth: 0.5,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 2.5,
    backgroundColor: "black",
    color: "white",
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    textTransform: "uppercase",
  },
  My_Heading: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 45,
    paddingBottom: 55,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  carDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf2",
    paddingBottom: 10,
  },
  carDetailHeading: {
    fontWeight: "bold",
    marginRight: 10,
    width: "50%",
    fontSize: 12,
  },
  carDetailName: {
    flex: 1,
    textAlign: "right",
    fontSize: 12,
  },
  BD_Txt_2_1: {
    fontSize: 12,
    color: "#575252",
    paddingHorizontal: 20,
    paddingVertical: 3,
    letterSpacing: 0.5,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
  },
  tabContainer: {
    flex: 1,
    height: 1200, // Give some height to make sure it shows up
  },
});
