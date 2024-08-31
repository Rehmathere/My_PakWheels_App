import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import LoginHeader from "../loginHeader";
import LogoutHeader from "../logoutHeader";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SyncStorage from "sync-storage";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
// ----- Modal -----
import carIcon from "../../assets/images/car_icon.png";
import bikeIcon from "../../assets/images/bike_icon.png";
import toolIcon from "../../assets/images/tools_icon.png";
// ----- Modal -----
// Fonts
import { useFonts } from "expo-font";

const MoreOption = ({ navigation }) => {
  // -------- Modal --------
  const [showStatus, setShowStatus] = useState(false);
  // -------- Modal --------
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true if user is logged in
  const username = "John Doe"; // Get username if logged in
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    const token = SyncStorage.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);

  const toggleProductDropdown = () => {
    setShowProductDropdown(!showProductDropdown);
  };
  const togglePersonalDropdown = () => {
    setShowPersonalDropdown(!showPersonalDropdown);
  };
  // const toggleProductDropdown = () => {
  //   setShowProductDropdown(!showProductDropdown);
  // };
  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
  };
  const toggleExploreDropdown = () => {
    setShowExploreDropdown(!showExploreDropdown);
  };

  const handleLogin = () => {
    // Handle login logic
    navigation.navigate("welcome");
  };

  const handleLogout = () => {
    // Handle logout logic
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            setIsLoggedIn(false);
            SyncStorage.remove("token");
            dispatch({ type: "LOGOUT" });
            navigation.navigate("home");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleViewProfile = () => {
    // Handle view profile logic
    navigation.navigate("profile");
  };

  const handleSavedAs = () => {
    navigation.navigate("My_Favorite");
    console.log("Navigate to Saved As");
  };
  const handleMyorders = () => {
    // Replace this with your actual logic for the My Ads button press
    if (SyncStorage.get("token")) {
      navigation.navigate("myAds");
    } else {
      navigation.navigate("welcome");
    }
    // navigation.navigate('sellItMyself');
    console.log("presed");
  };

  const handleNotification = () => {
    console.log("Navigate to Notifications");
  };

  // const handleLanguage = () => {
  //   console.log("Navigate to Languages");
  // };
  const handleUsedCars = () => {
    console.log("buyNow");
    navigation.navigate("buyNow");
    // Modal Close
    setShowStatus(false);
  };
  const handleCertifiedCars = () => {
    navigation.navigate("featureAd_Detail");
    // Modal Close
    setShowStatus(false);
  };
  const handlePremiumCars = () => {
    navigation.navigate("featureAd_Detail");
    // Modal Close
    setShowStatus(false);
  };

  const handleNewCars = () => {
    navigation.navigate("New_Cars_Find");
  };

  const handle_Blog = () => {
    navigation.navigate("Blog_Page");
  };
  const handle_Video = () => {
    navigation.navigate("Video_Page");
  };

  const handleBikes = () => {
    navigation.navigate("Rent_Bike");
  };
  const handleAutoParts = () => {
    navigation.navigate("Auto_Parts");
  };
  //
  const handleSellItForMe = () => {
    console.log("Navigate to My Garage");
  };

  const handleCarRegistration = () => {
    console.log("Navigate to My Cart");
  };

  const handleCarInspection = () => {
    console.log("Navigate to Saved As");
  };
  const handleCarFinance = () => {
    console.log("Navigate to Saved As");
  };
  const handleCarInsurance = () => {
    console.log("Navigate to Saved As");
  };
  const handlePartnerWorkshop = () => {
    console.log("Navigate to Saved As");
  };
  const handleContactUs = () => {
    console.log("Navigate to Saved As");
  };

  //   const token = SyncStorage.get("token");
  //   if (!token) {
  //     setIsLoggedIn(false);
  //   } else {
  //     setIsLoggedIn(true);
  //   }
  // -------------- Services OnPress ---------------
  const Free_Ad = () => {
    navigation.navigate("homeFreeAds");
  };
  const Prem_Ad = () => {
    navigation.navigate("homePremiumAds");
  };
  const Home_List_For_You = () => {
    navigation.navigate("homeListItForYou", { service: "001" });
  };
  const Home_Car_Inspection = () => {
    navigation.navigate("homeCarInspection", { service: "002" });
  };
  const Buy_Car_For_Me = () => {
    navigation.navigate("homeBuyCarForMe", { service: "003" });
  };
  const Rent_A_Car = () => {
    navigation.navigate("homeRentACar");
  };
  // -------------- Services OnPress ---------------
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
    <View>
      <View>
        {/* ----- Welcome Rehmat ----- */}
        {isLoggedIn ? (
          <LogoutHeader
            username={user.name ? user.name : "User"}
            onViewProfilePress={handleViewProfile}
            onLogoutPress={handleLogout}
          />
        ) : (
          <LoginHeader onLoginPress={handleLogin} />
        )}
        {/* Your other content goes here */}
      </View>
      <ScrollView>
        {/* Personal  dropdown*/}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={togglePersonalDropdown}
        >
          <Text style={styles.dropdownText}>Personal</Text>
          <Image
            source={
              showPersonalDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showPersonalDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity style={styles.subOption} onPress={handleMyorders}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>My Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleSavedAs}>
              <Image
                source={require("../../assets/love.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Saved ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleNotification}
            >
              <Image
                source={require("../../assets/notification.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Notifications</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.subOption} onPress={handleLanguage}>
              <Image
                source={require("../../assets/language.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Choose Language</Text>
            </TouchableOpacity> */}
          </View>
        )}
        {/* Product Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleProductDropdown}
        >
          <Text style={styles.dropdownText}>Product</Text>
          <Image
            source={
              showProductDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showProductDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity
              style={styles.subOption}
              onPress={() => {
                setShowStatus(true);
              }}
            >
              <Image
                source={require("../../assets/Car.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Used Cars</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleNewCars}>
              <Image
                source={require("../../assets/Car.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>New Cars</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handleBikes}>
              <Image
                source={require("../../assets/bike_1.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Bikes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subOption}
              onPress={handleAutoParts}
            >
              <Image
                source={require("../../assets/tools.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Auto Parts & Accessories</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Services Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleServicesDropdown}
        >
          <Text style={styles.dropdownText}>Services</Text>
          <Image
            source={
              showServicesDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showServicesDropdown && (
          <View style={styles.dropdownContent}>
            {/* - */}
            <TouchableOpacity style={styles.subOption} onPress={Free_Ad}>
              <Image
                source={require("../../assets/Registration.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Free Ads</Text>
            </TouchableOpacity>
            {/* - */}
            <TouchableOpacity style={styles.subOption} onPress={Prem_Ad}>
              <Image
                source={require("../../assets/insurance.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Premium Ads</Text>
            </TouchableOpacity>
            {/* - */}
            <TouchableOpacity
              style={styles.subOption}
              onPress={Home_List_For_You}
            >
              <Image
                source={require("../../assets/tools.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>List It For You</Text>
            </TouchableOpacity>
            {/* - */}
            <TouchableOpacity
              style={styles.subOption}
              onPress={Home_Car_Inspection}
            >
              <Image
                source={require("../../assets/cash.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Car Inspection</Text>
            </TouchableOpacity>
            {/* - */}
            <TouchableOpacity style={styles.subOption} onPress={Buy_Car_For_Me}>
              <Image
                source={require("../../assets/inspections.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Buy Car For Me</Text>
            </TouchableOpacity>
            {/* - */}
            <TouchableOpacity style={styles.subOption} onPress={Rent_A_Car}>
              <Image
                source={require("../../assets/cash.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Rent A Car</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Explore Dropdown */}
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={toggleExploreDropdown}
        >
          <Text style={styles.dropdownText}>More</Text>
          <Image
            source={
              showExploreDropdown
                ? require("../../assets/up-arrow.png")
                : require("../../assets/right-arroww.png")
            }
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {showExploreDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity style={styles.subOption} onPress={handle_Blog}>
              <Image
                source={require("../../assets/descriptionIcon.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subOption} onPress={handle_Video}>
              <Image
                source={require("../../assets/cameraIcon.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Videos</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.subOption} onPress={handleBikes}>
              <Image
                source={require("../../assets/cart.png")}
                style={styles.subOptionIcon}
                resizeMode="contain"
              />
              <Text style={styles.subOptionText}>Cool Rides</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </ScrollView>
      {/* -------- Used Cars Modal -------- */}
      <Modal transparent={true} animationType="fade" visible={showStatus}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Choose Option</Text>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
              <TouchableOpacity onPress={handleUsedCars}>
                <View style={styles.category}>
                  {/* Replace the source with your actual image */}
                  <Image source={carIcon} style={styles.categoryImage} />
                  <Text style={styles.textDecor}>Find Used Cars</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.category}>
                  {/* Replace the source with your actual image */}
                  <Image source={carIcon} style={styles.categoryImage} />
                  <Text style={styles.textDecor}>
                    Auto Finder Certified Cars
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePremiumCars}>
                <View style={styles.category}>
                  {/* Replace the source with your actual image */}
                  <Image source={carIcon} style={styles.categoryImage} />
                  <Text style={styles.textDecor}>Premium Cars</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Close modal button */}
            <TouchableOpacity
              onPress={() => {
                setShowStatus(false);
              }}
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* -------- Used Cars Modal -------- */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingHorizontal: 20,
    backgroundColor: "#bd2a2a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  logoutText: {
    fontSize: 16,
    color: "blue",
  },
  loginText: {
    fontSize: 16,
    color: "blue",
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 10,
    color: "white",
  },
  loginlogoutView: {
    flexDirection: "row",
  },
  logout: {
    marginLeft: 150,
  },
  login: {},
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 10,
  },
  profileButtonText: {
    fontSize: 16,
    color: "white",
  },
  arrowIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
    tintColor: "white",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    // borderBottomColor: "lightgrey",
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#FCB0B0",
    borderColor: "#FCB0B0",
  },
  dropdownText: {
    fontSize: 17.5,
    color: "#454545",
    verticalAlign: "middle",
    letterSpacing: 1,
    fontFamily: "Heebo",
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    tintColor: "grey",
  },
  dropdownContent: {
    backgroundColor: "whitesmoke", //(#f5f5f5)
    marginTop: 5,
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  subOption: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    paddingVertical: 5,
  },
  subOptionText: {
    fontSize: 16,
    color: "black",
    marginRight: 30,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
  },
  subOptionIcon: {
    width: 15,
    height: 15,
    tintColor: "grey",
    marginRight: 10,
  },
  centeredTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  needHelpText: {
    fontSize: 14,
    color: "dimgray",
    marginTop: 70,
    textAlign: "center",
  },
  contactUsText: {
    color: "darkred",
    textDecorationLine: "underline",
  },
  additionalText: {
    fontSize: 14,
    color: "lightslategrey",
    marginTop: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  categoriesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    // paddingLeft: 5,
    // borderColor: "black",
    // borderWidth: 0.5,
    paddingVertical: 8,
    backgroundColor: "lightpink",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 5,
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 10,
    // borderColor: "black",
    // borderWidth: 0.5,
    alignSelf: "center",
  },
  textDecor: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    // borderColor: "black",
    // borderWidth: 0.5,
    textAlign: "center",
  },
  closeButton: {
    // borderColor: "black",
    // borderWidth: 0.5,
    marginTop: 20,
    marginRight: 10,
    fontSize: 15,
    color: "#8b0000",
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});

export default MoreOption;
