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
          <AntDesign name="filter" size={22} color="#fc6f03" />
        </TouchableOpacity>
      </View>
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
                          <Text style={styles.infoText}>{item.KmDriven}</Text>
                        </View>
                      </View>

                      {/* Lower view */}
                      <View style={styles.lowerView}>
                        <View style={styles.infoContainer}>
                          <Image
                            source={require("../../assets/fuelIcon.png")}
                            style={styles.infoImage}
                          />
                          <Text style={styles.infoText}>{item.fuelType}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                          <Image
                            source={require("../../assets/locationIcon.png")}
                            style={styles.infoImage}
                          />
                          <Text style={styles.infoText}>{item.location}</Text>
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
      <View style={styles.button_Parent}>
        <TouchableOpacity style={styles.button} onPress={handleRentABike}>
          <Text style={styles.buttonText}>Post Your Bike</Text>
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
    paddingBottom: 5,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#bd2a2a",
  },
  SearchBar: {
    flex: 1,
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#2e8b57",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    marginRight: 5,
    fontSize: 14,
  },
  Container_Sub: {
    flex: 1,
  },
  button_Parent: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
  },
  imageContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  lowerView: {
    flexDirection: "column",
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
  infoText_2: {
    fontSize: 12,
    paddingVertical: 10,
  },
  featuredTag: {
    backgroundColor: "#ff0",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
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
});

export default Rent_Bike;
