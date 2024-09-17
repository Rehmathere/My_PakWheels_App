import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { AntDesign } from "@expo/vector-icons"; // Importing AntDesign icons
import SearchBar from "../searchBar";
import SyncStorage from "sync-storage"; // Import SyncStorage for checking login status
// Fonts
import { useFonts } from "expo-font";

const Rent_Bike = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/bike/"
        );
        if (response.data.ok) {
          setData(response.data.data);
        } else {
          setNoDataError("No Data To Show");
        }
      } catch (error) {
        console.log("Error fetching initial data:", error);
        setNoDataError(error.response?.data?.error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleFilterApply = async (filterData) => {
    console.log("Filter applied with values:", filterData);
    try {
      setIsLoading(true);
      setData([]);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/bike/filter",
        filterData
      );
      console.log("Filter API response:", response.data);
      if (response.data.ok) {
        if (response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setNoDataError("No Data To Show");
        }
      } else {
        setNoDataError("No Data To Show");
      }
    } catch (error) {
      console.log("Error applying filter:", error);
      setNoDataError(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterPress = () => {
    navigation.navigate("filter_RentBike", {
      onFilterApply: handleFilterApply,
    });
  };
  const handleRentABike = () => {
    if (SyncStorage.get("token")) {
      navigation.navigate("Rent_Bike_Post");
    } else {
      navigation.navigate("welcome");
    }
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../../assets/fonts/My_Soul/Kanit-Black.ttf"),
  });
  // It Will Load Font
  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);
  // It Tells If Font Is Loaded Or If Not Loaded Then Nothing Will Show,
  if (!fontsLoaded) {
    return null;
  }
  // --- Fonts Family ---
  // Main Body
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#bd2a2a" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Rent Bike</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.SearchBar}>
          {/* Your search bar component goes here */}
          <SearchBar />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Text style={styles.filterText}>Filter</Text>
          <AntDesign name="filter" size={22} color="black" />
        </TouchableOpacity>
      </View>
      {/* --- Main Body --- */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#cd0100" />
      ) : (
        <View style={styles.Container_Sub}>
          <ScrollView>
            {data.length > 0 ? (
              data.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("Rent_Bike_Details", { item })
                  }
                >
                  <View style={styles.cardParent}>
                    <View style={[styles.card]}>
                      <View style={styles.imageContainer}>
                        {item.images.length > 0 && (
                          <Image
                            source={{ uri: item.images[0] }}
                            style={styles.image}
                          />
                        )}
                      </View>
                      <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.model}</Text>
                        <Text style={styles.variant}>{item.brand}</Text>
                        <Text style={styles.price}>PKR {item.price}</Text>
                        {/* Below View Parent */}
                        <View style={styles.parentView}>
                          {/* Upper view */}
                          <View style={styles.upperView}>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/modelYear.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>{item.year}</Text>
                            </View>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/carMeter.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.KmDriven}
                              </Text>
                            </View>
                          </View>

                          {/* Lower view */}
                          <View style={styles.lowerView}>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/fuelIcon.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.fuelType}
                              </Text>
                            </View>
                            <View style={styles.infoContainer}>
                              <Image
                                source={require("../../assets/locationIcon.png")}
                                style={styles.infoImage}
                              />
                              <Text style={styles.infoText}>
                                {item.location}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>{noDataError}</Text>
            )}
          </ScrollView>
        </View>
      )}
      {/* --- Post Ad Btn --- */}
      <View style={styles.button_Parent}>
        <TouchableOpacity style={styles.button} onPress={handleRentABike}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* --- Post Ad Btn --- */}
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    tintColor: "white",
    marginLeft: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
    // tintColor: "white",
  },
  titleContainer: {
    flex: 1,
    paddingBottom: 5,
  },
  title: {
    // color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    alignSelf: "center",
    letterSpacing: 1,
  },
  rowContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#DCDCDC",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 20,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "white",
  },
  SearchBar: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#f39c12",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  filterText: {
    // color: "white",
    marginRight: 5,
    fontSize: 14,
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  Container_Sub: {
    flex: 1,
  },
  button_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
    bottom: 15,
    right: 5, 
  },
  button: {
    backgroundColor: "#bd2a2a",
    paddingVertical: 26,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 70,
    borderRadius: 50,
    alignSelf: "flex-end",
    shadowColor: "black",
    elevation: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1.5,
  },
  // New
  cardParent: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 3,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    position: "relative",
    marginBottom: 1,
  },
  imageContainer: {
    width: "100%",
    marginRight: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    overflow: "hidden", // Hides any content overflowing out of the container
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Kanit",
    paddingVertical: 10,
    color: "#bd2a2a",
    letterSpacing: 1,
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 15,
    fontFamily: "Heebo",
    color: "#4A4A4A",
    paddingBottom: 8,
    letterSpacing: 1,
  },
  parentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  upperView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  infoImage: {
    width: 15,
    height: 15,
    marginRight: 3,
    tintColor: "#bd2a2a",
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Kanit",
    letterSpacing: 1,
    paddingLeft: 9,
  },
});

export default Rent_Bike;
