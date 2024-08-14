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
import RegisteredPicker from "../registeredPicker";
import InputRange from "../inputRange";
import BodyColorPicker from "../bodyColor";
import FuelTypePicker from "../fuelTypePicker";
import BikeBrandPicker from "../bikeBrandFilter";
import BikeEnginePicker from "../bikeEngineFilter";

const Filter_RentBike = ({ route, navigation }) => {
  const { onFilterApply } = route.params;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  const [minKmDriven, setMinKmDriven] = useState(0);
  const [maxKmDriven, setMaxKmDriven] = useState(1000000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRegisteredLocation, setSelectedRegisteredLocation] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [registeredModalVisible, setRegisteredModalVisible] = useState(false);
  const [bodyColorModalVisible, setBodyColorModalVisible] = useState(false);
  const [fuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  const [bikeBrandModalVisible, setBikeBrandModalVisible] = useState(false);
  const [bikeEngineModalVisible, setBikeEngineModalVisible] = useState(false);

  const handleApplyFilter = () => {
    const data = {
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minKmDriven,
      maxKmDriven,
      selectedLocation,
      selectedRegisteredLocation,
      selectedColor,
      selectedFuelType,
      selectedEngineType,
      selectedBrand,
    };
    onFilterApply(data);
    navigation.goBack();
  };

  const handlePriceRange = (minValue, maxValue) => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  const handleYearRange = (minValue, maxValue) => {
    setMinYear(minValue);
    setMaxYear(maxValue);
  };

  const handleKmDrivenRange = (minValue, maxValue) => {
    setMinKmDriven(minValue);
    setMaxKmDriven(maxValue);
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

  const handleOpenRegisteredPicker = () => {
    setRegisteredModalVisible(true);
  };
  const handleCloseRegisteredPicker = () => {
    setRegisteredModalVisible(false);
  };
  const handleRegisteredSelect = (location) => {
    setSelectedRegisteredLocation(location);
    handleCloseRegisteredPicker();
  };

  const handleOpenBodyColorPicker = () => {
    setBodyColorModalVisible(true);
  };
  const handleCloseBodyColorPicker = () => {
    setBodyColorModalVisible(false);
  };
  const handleBodyColorSelect = (color) => {
    setSelectedColor(color);
    handleCloseBodyColorPicker();
  };

  const handleOpenFuelTypePicker = () => {
    setFuelTypeModalVisible(true);
  };
  const handleCloseFuelTypePicker = () => {
    setFuelTypeModalVisible(false);
  };
  const handleFuelTypeSelect = (fuelType) => {
    setSelectedFuelType(fuelType);
    handleCloseFuelTypePicker();
  };

  const handleOpenBikeBrandPicker = () => {
    setBikeBrandModalVisible(true);
  };
  const handleCloseBikeBrandPicker = () => {
    setBikeBrandModalVisible(false);
  };
  const handleBikeBrandSelect = (brand) => {
    setSelectedBrand(brand);
    handleCloseBikeBrandPicker();
  };

  const handleOpenBikeEnginePicker = () => {
    setBikeEngineModalVisible(true);
  };
  const handleCloseBikeEnginePicker = () => {
    setBikeEngineModalVisible(false);
  };
  const handleBikeEngineSelect = (engine) => {
    setSelectedEngineType(engine);
    handleCloseBikeEnginePicker();
  };

  const handleBack = () => {
    navigation.goBack();
  };

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
          <Text style={styles.title}>Bike Filter</Text>
        </View>
      </View>

      <View style={styles.InputRangeDiv}>
        <Text>Price Range:</Text>
        <InputRange
          min={0}
          max={1000000}
          title={"Price Range"}
          steps={1}
          onValueChange={handlePriceRange}
          style={styles.Input_Range_CSS}
        />
        <View style={styles.values}>
          <Text>{minPrice.toLocaleString()}</Text>
          <Text>{maxPrice.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.InputRangeDiv}>
        <Text>Year Range:</Text>
        <InputRange
          min={2000}
          max={2024}
          title={"Year Range"}
          steps={1}
          onValueChange={handleYearRange}
          style={styles.Input_Range_CSS}
        />
        <View style={styles.values}>
          <Text>{minYear}</Text>
          <Text>{maxYear}</Text>
        </View>
      </View>

      <View style={styles.InputRangeDiv}>
        <Text>Kilometers Driven:</Text>
        <InputRange
          min={0}
          max={1000000}
          title={"Kilometers Driven"}
          steps={1}
          onValueChange={handleKmDrivenRange}
          style={styles.Input_Range_CSS}
        />
        <View style={styles.values}>
          <Text>{minKmDriven.toLocaleString()}</Text>
          <Text>{maxKmDriven.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.DataDiv}>
        <Button title="Location" onPress={handleOpenLocationPicker} />
        <LocationPicker
          isVisible={locationModalVisible}
          onClose={handleCloseLocationPicker}
          onSelectLocation={handleLocationSelect}
        />
        <Text>{selectedLocation}</Text>
      </View>

      <View style={styles.DataDiv}>
        <Button
          title="Registered Location"
          onPress={handleOpenRegisteredPicker}
        />
        <RegisteredPicker
          isVisible={registeredModalVisible}
          onClose={handleCloseRegisteredPicker}
          onSelectCity={handleRegisteredSelect}
        />
        <Text>{selectedRegisteredLocation}</Text>
      </View>

      <View style={styles.DataDiv}>
        <Button title="Color" onPress={handleOpenBodyColorPicker} />
        <BodyColorPicker
          isVisible={bodyColorModalVisible}
          onClose={handleCloseBodyColorPicker}
          onSelectColor={handleBodyColorSelect}
        />
        <Text>{selectedColor}</Text>
      </View>

      <View style={styles.DataDiv}>
        <Button title="Fuel Type" onPress={handleOpenFuelTypePicker} />
        <FuelTypePicker
          isVisible={fuelTypeModalVisible}
          onClose={handleCloseFuelTypePicker}
          onSelectFuelType={handleFuelTypeSelect}
        />
        <Text>{selectedFuelType}</Text>
      </View>

      <View style={styles.DataDiv}>
        <Button title="Brand" onPress={handleOpenBikeBrandPicker} />
        <BikeBrandPicker
          isVisible={bikeBrandModalVisible}
          onClose={handleCloseBikeBrandPicker}
          onSelectBrand={handleBikeBrandSelect}
        />
        <Text>{selectedBrand}</Text>
      </View>

      <View style={styles.DataDiv}>
        <Button title="Engine Type" onPress={handleOpenBikeEnginePicker} />
        <BikeEnginePicker
          isVisible={bikeEngineModalVisible}
          onClose={handleCloseBikeEnginePicker}
          onSelectEngine={handleBikeEngineSelect} // Corrected prop name
        />
        <Text>{selectedEngineType}</Text>
      </View>

      <View style={styles.ButtonDiv}>
        <Button title="Apply" onPress={handleApplyFilter} color={"green"} />
        <Text>{"\n"}</Text>
        <Button
          title="Remove All"
          onPress={() => {
            setMinPrice(0);
            setMaxPrice(1000000);
            setMinYear(2000);
            setMaxYear(2024);
            setMinKmDriven(0);
            setMaxKmDriven(1000000);
            setSelectedLocation("");
            setSelectedRegisteredLocation("");
            setSelectedColor("");
            setSelectedFuelType("");
            setSelectedEngineType("");
            setSelectedBrand("");
          }}
          color="red"
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  filter: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  header: {
    backgroundColor: "#bd2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    marginBottom: 30,
  },
  backButton: {
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
  InputRangeDiv: {
    marginBottom: 25,
  },
  DataDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  ButtonDiv: {
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: "transparent",
    marginHorizontal: 20,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default Filter_RentBike;
