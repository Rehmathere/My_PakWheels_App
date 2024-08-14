import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import SellNowPopup from "./screens/sellNowPopup";
import SearchBar from "./searchBar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Entypo } from "@expo/vector-icons";
import SyncStorage from "sync-storage";
// import FilterSearchCar from "./screens/filterSearch";
const MainHeader = ({
  onPressHome,
  onPressMyAds,
  onPressSellNow,
  onPressMore,
}) => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleHomePress = () => {
    // Replace this with your actual logic for the Home button press
    // console.log('Home button pressed');
  };

  // const handleMyAdsPress = () => {
  //   // Replace this with your actual logic for the My Ads button press
  //   if (SyncStorage.get("token")) {
  //     navigation.navigate("myAds");
  //   } else {
  //     navigation.navigate("welcome");
  //   }
  //   // navigation.navigate('sellItMyself');
  //   console.log("presed");
  // };

  const [sellNowPopupVisible, setSellNowPopupVisible] = React.useState(false);

  const handleSellNowPress = () => {
    // Replace this with your actual logic for the Sell Now button press
    // console.log('Sell Now button pressed');

    setSellNowPopupVisible(true);
  };

  const handleMorePress = () => {
    // Replace this with your actual logic for the More button press
    console.log("More button pressed");
    // navigation.navigate("more");
    navigation.navigate("moreOption");
  };

  const handleBuyNowPress = () => {
    navigation.navigate("buyNow");
  };

  const handleRentPress = () => {
    navigation.navigate("DealerPackage");
    // navigation.navigate("transactionApproval");
  };
  // Main Body
  return (
    <View>
      {/* StatusBar */}
      <StatusBar backgroundColor={"#bd2a2a"} />
      {/* ---------- 4 Buttons ----------- */}
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.buttonHolder}>
          {/* <TouchableOpacity style={styles.buttons} onPress={handleMyAdsPress}>
            <Text style={styles.buttonText}>Used Cars</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.buttons} onPress={handleSellNowPress}>
            <Text style={styles.buttonText}>New Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleBuyNowPress}>
            <Text style={styles.buttonText}>Used Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleRentPress}>
            <Text style={styles.buttonText}>Packages</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* ---------- 4 Buttons ----------- */}
      {/* ---------- Search Bar ----------- */}
      <View style={styles.headerContainer}>
        {/* User Name */}
        {/* More Button
        <TouchableOpacity
          style={styles.moreButton}
          onPress={onPressMore || handleMorePress}
        >
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity> */}
        {/* Search bar */}
        <View style={styles.rowContainer}>
          {/* Search bar */}
          <View style={styles.SearchBar}>
            {/* Your search bar component goes here */}
            <SearchBar />
          </View>
        </View>
      </View>
      {/* ---------- Search Bar ----------- */}
      <SellNowPopup
        visible={sellNowPopupVisible}
        onClose={() => setSellNowPopupVisible(false)}
        onSelectCategory={(category) => {
          console.log(`Selected category: ${category}`);
          setSellNowPopupVisible(false); // Close the popup
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  userName: {
    color: "white",
    fontWeight: "900",
    fontSize: 22,
  },
  welcomeText: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 1,
    paddingTop: 30,
    paddingHorizontal: 12,
    width: "100%",
    backgroundColor: "#bd2a2a",
    // borderWidth: 1,
    // borderColor: "white",
  },
  buttons: {
    backgroundColor: "white",
    width: "27%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
    elevation: 5,
    // marginHorizontal: 2,
  },
  buttonText: {
    textAlign: "center",
    color: "#bd2a2a",
    fontWeight: "bold",
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2.5,
    paddingVertical: 0,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  SearchBar: {
    flex: 1,
    // backgroundColor: "#f0f0f0",
    backgroundColor: "#bd2a2a",
    borderRadius: 5,
    marginRight: 1,
    paddingHorizontal: 1,
    width: "100%",
    borderColor: "transparent",
  },
});

export default MainHeader;
