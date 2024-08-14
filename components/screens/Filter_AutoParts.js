import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import LocationPicker from "../locationPicker";
import InputRange from "../inputRange";
import CategorySelect from "./CategorySelect";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const Filter_AutoParts = ({ route, navigation }) => {
  const { onFilterApply } = route.params;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const handleApplyFilter = () => {
    const data = {
      minPrice,
      maxPrice,
      selectedLocation,
      selectedCategoryName,
    };
    onFilterApply(data);
    navigation.goBack();
  };

  const handlePriceRange = (minValue, maxValue) => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  const handleOpenLocationPicker = () => {
    setLocationModalVisible(true);
  };
  const handleCloseLocationPicker = () => {
    setLocationModalVisible(false);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleCloseLocationPicker();
  };

  const handleOpenCategoryPicker = () => {
    setCategoryModalVisible(true);
  };
  const handleCloseCategoryPicker = () => {
    setCategoryModalVisible(false);
  };
  const handleCategorySelect = (category) => {
    setSelectedCategoryName(category);
    handleCloseCategoryPicker();
  };
  const handleBack = () => {
    navigation.goBack();
  };
  // Main Body
  return (
    <ScrollView style={styles.filter}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require("../../assets/back-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Auto Parts Filter</Text>
        </View>
      </View>
      {/* ---- Filter Body --- */}
      {/* Image */}
      <View style={styles.My_Parent_Img}>
        <Image
          source={require("../../assets/tools.png")}
          style={styles.My_Parent_Img_Box}
        />
        <Text style={styles.My_Parent_Img_Txt}>Auto Parts Filter</Text>
      </View>
      {/* Input Range */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>1 - Price :</Text>
      <View style={styles.InputRangeDiv}>
        <View style={styles.InputRangeDiv_Parent}>
          <View style={styles.My_Btn_Opt_Parent_Box}>
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <Entypo name="location-pin" size={24} color="white" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Use Price Below</Text>
          </View>
          <InputRange
            min={0}
            max={50000}
            title={"Your Price Range"}
            steps={1}
            onValueChange={handlePriceRange}
          />
        </View>
        <View style={styles.values}>
          <Text>{minPrice.toLocaleString()}</Text>
          <Text>{maxPrice.toLocaleString()}</Text>
        </View>
      </View>
      {/* Location Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>2 - Location :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box}
            onPress={handleOpenLocationPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <Entypo name="location-pin" size={24} color="white" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Choose Location</Text>
          </TouchableOpacity>
        </View>
        <LocationPicker
          isVisible={locationModalVisible}
          onClose={handleCloseLocationPicker}
          onSelectLocation={handleLocationSelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedLocation}</Text>
      </View>
      {/* Category Option */}
      <Text style={styles.My_Btn_Opt_Parent_Grand_Txt}>3 - Category :</Text>
      <View style={styles.My_Btn_Opt_Parent_Grand}>
        <View style={styles.My_Btn_Opt_Parent}>
          <TouchableOpacity
            style={styles.My_Btn_Opt_Parent_Box}
            onPress={handleOpenCategoryPicker}
          >
            <Text style={styles.My_Btn_Opt_Parent_Txt_1}>
              <AntDesign name="menu-fold" size={23} color="white" />
            </Text>
            <Text style={styles.My_Btn_Opt_Parent_Txt_2}>Choose Category</Text>
          </TouchableOpacity>
        </View>
        <CategorySelect
          isVisible={categoryModalVisible}
          onClose={handleCloseCategoryPicker}
          onSelectLocation={handleCategorySelect}
        />
        <Text style={styles.Below_Name_Txt}>{selectedCategoryName}</Text>
      </View>
      {/* Apply Btn */}
      <View style={styles.My_Btn_Parent}>
        <TouchableOpacity
          style={styles.My_Btn_Parent_Box}
          onPress={handleApplyFilter}
        >
          <Text style={styles.My_Btn_Parent_Box_Txt}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Cancel Btn */}
      <View style={styles.My_Btn_Parent}>
        <TouchableOpacity
          style={styles.My_Btn_Parent_Box_2}
          onPress={() => {
            setMinPrice(0);
            setMaxPrice(50000);
            setSelectedLocation("");
            setSelectedCategoryName("");
            navigation.navigate("Auto_Parts");
          }}
        >
          <Text style={styles.My_Btn_Parent_Box_Txt}>Remove All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  buyNow: {
    flex: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },
  pageHeadingCont: {
    alignItems: "center",
    marginVertical: 10,
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  underHeadingCont: {
    flex: 1,
  },
  carAdsCont: {
    flex: 1,
  },
  adCard: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imgHolder: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailHolder: {
    flex: 1,
    justifyContent: "space-between",
  },
  adTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  adPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cd0100",
  },
  featuredTag: {
    backgroundColor: "#ff0",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  filter: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  InputRangeDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
  },
  InputRangeDiv_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  Input_Range_CSS_0: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#bd2a2a",
  },
  DataDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    // backgroundColor: "yellow",
    marginHorizontal: 20,
  },
  ButtonDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    // backgroundColor: "yellow",
    marginHorizontal: 20,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    marginBottom: 30,
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
  // New CSS
  My_Btn_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 38,
  },
  My_Btn_Parent_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  My_Btn_Parent_Box_2: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
  My_Btn_Parent_Box_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 5,
    borderRadius: 30,
    textAlign: "center",
    letterSpacing: 2.2,
    color: "white",
    fontSize: 18,
  },
  My_Btn_Opt_Parent_Grand_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    paddingHorizontal: 16,
    letterSpacing: 0.8,
    fontWeight: "bold",
  },
  My_Btn_Opt_Parent_Grand: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 2,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  My_Btn_Opt_Parent: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 10,
    paddingBottom: 3,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  My_Btn_Opt_Parent_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    paddingHorizontal: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  My_Btn_Opt_Parent_Txt_1: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#bd2a2a",
  },
  My_Btn_Opt_Parent_Txt_2: {
    borderWidth: 0.5,
    borderColor: "#FFD1D1",
    paddingVertical: 9,
    paddingHorizontal: 46,
    letterSpacing: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    fontSize: 14,
    backgroundColor: "#FFD1D1",
  },
  Below_Name_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 1,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.5,
  },
  My_Parent_Img: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingTop: 30,
    paddingBottom: 40,
  },
  My_Parent_Img_Box: {
    borderWidth: 0.5,
    borderColor: "transparent",
    width: 90,
    height: 90,
    tintColor: "#bd2a2a",
    alignSelf: "center",
  },
  My_Parent_Img_Txt: {
    borderWidth: 0.5,
    borderColor: "transparent",
    fontSize: 23,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10,
    letterSpacing: 1,
    fontWeight: "bold",
  },
});

export default Filter_AutoParts;
