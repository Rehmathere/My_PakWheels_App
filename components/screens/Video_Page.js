import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import Header from "../header"; // Corrected import with PascalCase
import { ScrollView } from "react-native-gesture-handler";

export default function Video_Page() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://autofinder-backend.vercel.app/api/video"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching blog data: ", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMMM d, yyyy h:mm a");
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleItemPress = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    Linking.openURL(url).catch((err) => console.error("Error opening URL: ", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#bd2a2a"} />
      {/* Header */}
      <Header title="Videos" onPressBack={handleBackPress} />
      <ScrollView>
        {/* Body */}
        {data.length > 0 &&
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.Blog_Box_Grand_Parent}
              onPress={() => handleItemPress(item.LinkURL)}
            >
              {/* First */}
              <View style={styles.Blog_Box_Parent}>
                <View style={styles.Blog_Box_Part_1}>
                  <View style={styles.Blog_Box_Part_1_Sub}>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={styles.Blog_Box_Part_1_Img}
                    />
                  </View>
                </View>
                <View style={styles.Blog_Box_Part_2}>
                  <Text style={styles.Blog_Box_Part_2_Txt_1}>{item.title}</Text>
                  {/* <Text style={styles.Blog_Box_Part_2_Txt_2}>{item.author}</Text> */}
                  <Text style={styles.Blog_Box_Part_2_Txt_2}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 3,
    paddingTop: 0,
  },
  Blog_Box_Grand_Parent: {
    backgroundColor: "white",
    // borderWidth: 0.5,
    width: "100%",
    paddingVertical: 5,
  },
  Blog_Box_Parent: {
    backgroundColor: "white",
    // borderWidth: 0.5,
    marginVertical: 10,
    width: "88%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    // Apply shadow properties
    elevation: 5, // for Android
  },
  Blog_Box_Part_1: {
    // borderWidth: 0.5,
    width: "37",
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignSelf: "center",
    borderRadius: 3,
  },
  Blog_Box_Part_1_Sub: {
    // borderWidth: 0.5,
    width: "100%",
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 3,
  },
  Blog_Box_Part_1_Img: {
    width: 70,
    height: 55,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignSelf: "center",
    borderRadius: 3,
    // borderWidth: 0.5,
    borderColor: "black",
  },
  Blog_Box_Part_2: {
    // borderWidth: 0.5,
    width: "65%",
    paddingHorizontal: 3,
    paddingVertical: 3,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 5,
  },
  Blog_Box_Part_2_Txt_1: {
    // borderWidth: 0.5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  Blog_Box_Part_2_Txt_2: {
    // borderWidth: 0.5,
    marginTop: 4,
    fontSize: 13,
  },
});
