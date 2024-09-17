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
// Fonts
import { useFonts } from "expo-font";

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
              style={styles.myBox}
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
                <Text style={styles.name}>{item.brand} {item.model}</Text>
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
    marginTop: 20,
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
    marginLeft: 0,
    // borderWidth: 0.5,
    color: "black",
    fontSize: 17,
    fontFamily: "Heebo",
    letterSpacing: 0.2,
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
    marginRight: 6,
    letterSpacing: 0.5,
    fontFamily: "Kanit",
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
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 10,
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
    backgroundColor: "#FFF2F2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    color: "#bd2a2a",
    fontWeight: "bold",
    fontSize: 12,
  },
  price: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
  },
  city: {
    color: "grey",
    fontSize: 12,
    fontFamily: "Kanit",
    marginBottom: 5,
    letterSpacing: 1,
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
  myBox: {
    marginHorizontal: 10,
    marginBottom: 10,
    width: 120,
  },
  imageContainer: {
    width: "100%",
    marginRight: 0,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    fontSize: 12.5,
    // fontWeight: "bold",
    marginTop: 1,
    marginBottom: 5,
    color: "#bd2a2a",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  variant: {
    fontSize: 12,
    marginBottom: 5,
    color: "grey",
  },
  price: {
    fontSize: 13.5,
    fontFamily: "Heebo",
    color: "black",
    marginBottom: 3,
    letterSpacing: 0.8,
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
