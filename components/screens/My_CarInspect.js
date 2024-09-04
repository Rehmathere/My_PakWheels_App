import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Button,
  FlatList,
} from "react-native";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Alert, Linking } from "react-native";
// Fonts
import { useFonts } from "expo-font";

export default function My_CarInspect() {
  // User
  const { user } = useContext(UserContext);
  // Back
  const navigation = useNavigation();
  const handlerBack = () => {
    navigation.goBack();
  };
  //   --- API ---
  const [data, setData] = useState([]);
  const [data_R, setData_R] = useState([]);
  const [selectedService, setSelectedService] = useState("002"); // Default service
  const [noDataMessage, setNoDataMessage] = useState("");

  //   --- Report API ---
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/carInspectionReport"
        );
        setData_R(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  //   --- Report API ---

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/",
          {
            service: selectedService,
            approved: true,
          }
        );
        const fetchedData = response.data.data;
        if (fetchedData.length === 0) {
          setNoDataMessage("No Data In This Service");
          setData([]);
        } else {
          setNoDataMessage("");
          setData(fetchedData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [selectedService]);

  const handleShowReport = async (id) => {
    try {
      console.log("Clicked ID:", id); // Log the clicked ID

      // Construct the URL for the file
      const url = `https://autofinder-backend.vercel.app/api/carInspectionReport/${id}`;

      // Check if the link can be opened
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Open the file in the device's default browser
        await Linking.openURL(url);
        Alert.alert("Download Started", "Your report is being downloaded.");
      } else {
        Alert.alert(
          "Error",
          "Cannot open the link. Please check the URL and try again."
        );
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      Alert.alert(
        "Error",
        "Report not found. Please check the ID and try again."
      );
    }
  };

  //   --- API ---
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handlerBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Request For Car Inspection</Text>
        </View>
      </View>
      {/* Main Body */}
      {/* --- API Working --- */}
      <Text style={styles.buttonContainer_Txt}>Choose Service</Text>
      <View style={styles.buttonContainer}>
        <Text
          onPress={() => setSelectedService("001")}
          style={[
            styles.MyItemTxt,
            {
              backgroundColor: selectedService === "001" ? "#bc0000" : "white",
              color: selectedService === "001" ? "white" : "black",
            },
          ]}
        >
          001
        </Text>
        <Text
          onPress={() => setSelectedService("002")}
          style={[
            styles.MyItemTxt,
            {
              backgroundColor: selectedService === "002" ? "#bc0000" : "white",
              color: selectedService === "002" ? "white" : "black",
            },
          ]}
        >
          002
        </Text>
        <Text
          onPress={() => setSelectedService("003")}
          style={[
            styles.MyItemTxt,
            {
              backgroundColor: selectedService === "003" ? "#bc0000" : "white",
              color: selectedService === "003" ? "white" : "black",
            },
          ]}
        >
          003
        </Text>
        <Text
          onPress={() => setSelectedService("004")}
          style={[
            styles.MyItemTxt,
            {
              backgroundColor: selectedService === "004" ? "#bc0000" : "white",
              color: selectedService === "004" ? "white" : "black",
            },
          ]}
        >
          004
        </Text>
      </View>

      {/* Report */}
      {noDataMessage ? (
        <Text style={styles.noDataMessage}>{noDataMessage}</Text>
      ) : (
        <FlatList
          data={data_R}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.My_Heading}>Request Details</Text>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Sr. No :</Text>
                <Text style={styles.itemText_1}>{index + 1}</Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Reports ID :</Text>
                <Text style={styles.itemText_1}>{item._id}</Text>
              </View>
              <View style={styles.My_Report_Box}>
                <Button
                  title="Download Report"
                  onPress={() => handleShowReport(item._id)}
                  color={"blue"}
                />
              </View>
            </View>
          )}
        />
      )}

      {/* Details */}
      {noDataMessage ? (
        <Text style={{ fontSize: 2 }}>{noDataMessage}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Name :</Text>
                <Text style={styles.itemText_1}>
                  {item.user?.name || " - "}
                </Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Phone No :</Text>
                <Text style={styles.itemText_1}>
                  {item.user?.phoneNumber || " - "}
                </Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Car Detail :</Text>
                <Text style={styles.itemText_1}>
                  {item.year} {item.brand} {item.model} {item.varient || " - "}
                </Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Price :</Text>
                <Text style={styles.itemText_1}>{item.price || " - "} </Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Service :</Text>
                <Text style={styles.itemText_1}>{item.service || " - "}</Text>
              </View>
              <View style={styles.Item_Subbox}>
                <Text style={styles.itemText}>Inspector Allote :</Text>
                <Text style={styles.itemText_1}>
                  {" "}
                  {item.userAllocate?.name || "Not Appointed"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
      {/* --- API Working --- */}
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bd2a2a",
    paddingTop: StatusBar.currentHeight,
    // zIndex: 1,
  },
  backButton: {
    // paddingRight: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginLeft: 15,
  },
  titleContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Kanit",
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer_Txt: {
    borderWidth: 0,
    fontFamily: "Kanit",
    fontSize: 17,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    letterSpacing: 0.5,
  },
  MyItemTxt: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    borderRadius: 10,
    width: "15%",
    textAlign: "center",
    // paddingHorizontal: 10,
    paddingVertical: 6,
  },
  itemContainer: {
    paddingTop: 10,
    paddingBottom: 1,
  },
  Item_Subbox: {
    borderWidth: 0,
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 3,
  },
  itemText: {
    borderWidth: 0,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "40%",
  },
  itemText_1: {
    borderWidth: 0,
    fontFamily: "Kanit",
    letterSpacing: 0.5,
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "60%",
    textAlign: "center",
    color: "#bc0000",
  },
  My_Report_Box: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  My_Heading: {
    fontFamily: "Heebo",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 30,
    letterSpacing: 1.2,
  },
});
