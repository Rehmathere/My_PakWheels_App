import React from "react";
import { View, StyleSheet, ScrollView, Alert , Text } from "react-native";
import DealerPackageActive from "../DealerPackageActive";
import { useContext,  } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios"


const packages = () => {
  const {user , dispatch} = useContext(UserContext)
  const handlePress = () => {
    // Handle package selection logic here
    Alert.alert(
      "Delete Package",
      "Are you sure you want to delete this package?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deletePackage(),
        },
      ]
    );
  };

  async function deletePackage(){
    try {
      const response = await axios.post("https://autofinder-backend.vercel.app/api/user/deletePackage" , {userId  : user._id})
      console.log(response.data.data)
      dispatch({type:"LOGIN" , payload:response.data.data})
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {user.package !==null ? (
          <DealerPackageActive
          packageInfo={{
            _id: `${user.package._id}`,
            heading: `${user.package.heading}`,
            premiumBundles: `${user.package.premiumBundles}`,
            liveAdDays: `${user.package.liveAdDays}`,
            freeBoosterPack: `${user.package.freeBoosterPack}`,
            actualPrice: `${user.package.actualPrice}`,
            discountedRate: `${user.package.discountedRate}`,
            saved: `${user.package.saved}`,
            costPerAd: `${user.package.costPerAd}`,
          }}
          onPress={handlePress}
          borderColor="#4CAF50" // Example border color
        />  
        ):(<Text>Please Buy a Dealer Package</Text>)}
        
        
        {/* Add more DealerCard components as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default packages;
