// File: ActiveAds.js

import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import MyCarAdsCards from "../myCarAdsCards";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

// Ensure that ActiveAds is exported as a default export
export default function ActiveAds() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          { user: `${user._id}` }
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchData();
  }, []);

  const handleBoost = async (carAdId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/boostAd",
        { userId: user._id, carAdId: carAdId }
      );
      if (response.data.ok) {
        Alert.alert("Success", "Your ad has been boosted!");
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.error);
    }
  };

  const handleDelete = async (carAdId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/deleteAd",
        { carAdId: carAdId }
      );
      if (response.data.ok) {
        const newData = data.filter(
          (item) => item._id !== response.data.data._id
        );
        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {data.length > 0 &&
          data.map((item) => (
            <MyCarAdsCards
              key={item._id}
              _id={item._id}
              carImage={item.images[0]}
              name={item.brand}
              model={item.model}
              variant={item.varient}
              price={item.price}
              year={item.year}
              fuelType={item.fuelType}
              kmReading={item.kmDriven}
              location={item.location}
              isInspected={item.inspected}
              isFeatured={item.featured}
              isManagedByAutoFinder={item.ManagedByAutoFinder}
              pendingCard={false}
              onRemovePress={handleDelete}
              onBoostPress={handleBoost}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 3,
    paddingTop: 0,
  },
});
