/* eslint-disable prettier/prettier */
// FeaturedAd.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
// Fonts
import { useFonts } from "expo-font";

const FeaturedAd = ({ navigation }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          { featured: true }
        );

        // console.log(response.data.data)
        setItems(response.data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);

  // Mock data for 10 items
  // const items = Array.from({ length: 10 }, (_, index) => ({
  //   id: index + 1,
  //   name: `Item ${index + 1}`,
  //   price: `$${(index + 1) * 1000}`,
  //   city: 'City Name',
  //   model: 'Model Name',
  //   kmDriven: `${(index + 1) * 5000} km`,
  //   // Image source will be provided by the user during upload
  //   // For now, using a placeholder image
  //   //imageSource: require('./path/to/placeholder-image.jpg'), // Replace with your placeholder image path
  // }));
  const handleItemPress = (itemId) => {
    // Navigate to the home.js screen with the itemId
    navigation.navigate("sellerCarDetail", { itemId });
  };
  // ----- Feature Ad List Show Only -----
  const handleListFeatureAdPress = () => {
    // Navigate to the home.js screen with the itemId
    navigation.navigate("featureAd_Detail");
  };
  // --- Fonts Family ---
  // 1 - useState
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Expo Font Logic
  let [loaded] = useFonts({
    Archivo: require("../assets/fonts/My_Soul/ArchivoBlack-Regular.ttf"),
    Kanit: require("../assets/fonts/My_Soul/Kanit-Light.ttf"),
    Heebo: require("../assets/fonts/My_Soul/Heebo-Medium.ttf"),
    HeeboExtra: require("../assets/fonts/My_Soul/Heebo-ExtraBold.ttf"),
    KanitBold: require("../assets/fonts/My_Soul/Kanit-Bold.ttf"),
    KanitBlack: require("../assets/fonts/My_Soul/Kanit-Black.ttf"),
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
        <Text style={styles.Extra_Box_Txt_1}>Featured Ads</Text>
        {/* - */}
        <TouchableOpacity
          style={styles.Extra_Box_Txt_2_Box}
          onPress={handleListFeatureAdPress}
        >
          <Text style={styles.Extra_Box_Txt_2}>See All</Text>
        </TouchableOpacity>
      </View>
      {/* Box */}
      {/* <Text style={styles.featuredAdsLabel}>Featured Ads</Text> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {items.length > 0 &&
          items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => handleItemPress(item._id)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />
              </View>
              <View style={styles.contentContainer}>
                <Text
                  style={styles.name}
                >{`${item.year} ${item.brand} ${item.varient}`}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.city}>{item.city}</Text>
                <Text
                  style={styles.modelKmDriven}
                >{`${item.brand} / ${item.kmDriven}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  featuredAdsContainer: {
    marginBottom: 10,
    marginLeft: 4,
  },
  featuredAdsLabel: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  Extra_Box: {
    // borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  Extra_Box_Txt_1: {
    // borderWidth: 0.5,
    color: "black",
    fontSize: 18.5,
    fontSize: 17,
    fontFamily: "Heebo",
    marginLeft: 5,
  },
  // Extra_Box_Txt_2_Box: {
  //   borderWidth: 0.5,
  // },
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
});

export default FeaturedAd;
