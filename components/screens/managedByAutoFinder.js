/* eslint-disable prettier/prettier */
// FeaturedAd.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const ManagedByAutoFinder = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // API
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching bike data: ", error);
    }
  };
  const handleCardPress = (itemId) => {
    navigation.navigate("sellerCarDetail", { itemId: itemId });
  };
  // Main Body
  return (
    <View style={styles.featuredAdsContainer}>
      {/* Box */}
      <View style={styles.Extra_Box}>
        {/* - */}
        <Text style={styles.Extra_Box_Txt_1}>Managed Ads By AutoFinder</Text>
        {/* - */}
        <TouchableOpacity
          style={styles.Extra_Box_Txt_2_Box}
          onPress={() => navigation.navigate("buyNow")}
        >
          <Text style={styles.Extra_Box_Txt_2}>See All</Text>
        </TouchableOpacity>
      </View>
      {/* Box */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {data.length > 0 &&
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(item)}
              style={{ marginHorizontal: 10 }}
            >
              {/* Image container */}
              <View style={styles.imageContainer}>
                {/* Placeholder for user-uploaded image */}
                {/* You can replace this with your actual image upload component */}
                <Image
                  // source={require("../../assets/BMW.png")}
                  source={{ uri: item.images[0] }} // Use the first image URI
                  style={styles.image}
                />
              </View>
              {/* Content container */}
              <View style={styles.contentContainer}>
                {/* Item details */}
                <Text style={styles.name}>{item.brand}</Text>
                <Text style={styles.price}>PKR {item.price}</Text>
                <Text style={styles.city}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  featuredAdsContainer: {
    marginBottom: 20,
    paddingLeft: 10,
  },
  featuredAdsLabel: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
    padding: 5,
  },
  Extra_Box: {
    // borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  Extra_Box_Txt_1: {
    marginLeft: 5,
    // borderWidth: 0.5,
    color: "black",
    fontSize: 18.2,
    fontWeight: "bold",
  },
  Extra_Box_Txt_2_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
  },
  Extra_Box_Txt_2: {
    // borderWidth: 0.5,
    color: "black",
    fontSize: 13,
    color: "#bd2a2a",
    margin: "auto",
    marginRight: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  container: {
    flexDirection: "row",
  },
  itemContainer: {
    width: 180,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    margin: 5,
    flexDirection: "column",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // Make sure to handle image dimensions appropriately
  },
  contentContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f4f0ec",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    color: "#bd2a2a",
    fontWeight: "bold",
    fontSize: 12,
  },
  price: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    color: "#8b8c8c",
    fontSize: 12,
  },
  modelKmDriven: {
    color: "#8b8c8c",
    fontSize: 12,
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
});

export default ManagedByAutoFinder;
