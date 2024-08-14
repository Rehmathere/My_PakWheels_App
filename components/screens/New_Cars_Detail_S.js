import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function New_Cars_Detail_S() {
  const [openBoxIndex, setOpenBoxIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenBoxIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View style={styles.container}>
      {/* ----- Box 1: Dimensions ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(1)}>
        <Text style={styles.Question_Txt_1}>Dimensions</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 1 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 1 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Length</Text>
            <Text style={styles.AnswerName}>O L</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Width</Text>
            <Text style={styles.AnswerName}>O W</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Overall Height</Text>
            <Text style={styles.AnswerName}>O H</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Base</Text>
            <Text style={styles.AnswerName}>W B</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Ground Clearance</Text>
            <Text style={styles.AnswerName}>G C</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Kerb Weight</Text>
            <Text style={styles.AnswerName}>K W</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Boot Space</Text>
            <Text style={styles.AnswerName}>B S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Seating Capacity</Text>
            <Text style={styles.AnswerName}>S C</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>No Of Doors</Text>
            <Text style={styles.AnswerName}>N D</Text>
          </View>
        </View>
      )}

      {/* ----- Box 2: Engine Motor ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(2)}>
        <Text style={styles.Question_Txt_1}>Engine Motor</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 2 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 2 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Engine Type</Text>
            <Text style={styles.AnswerName}>E T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Battery Type</Text>
            <Text style={styles.AnswerName}>B T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Battery Capacity</Text>
            <Text style={styles.AnswerName}>B C</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Range</Text>
            <Text style={styles.AnswerName}>R</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Max Speed</Text>
            <Text style={styles.AnswerName}>M S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power</Text>
            <Text style={styles.AnswerName}>P</Text>
          </View>
        </View>
      )}

      {/* ----- Box 3: Transmission ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(3)}>
        <Text style={styles.Question_Txt_1}>Transmission</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 3 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 3 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Transmission Type</Text>
            <Text style={styles.AnswerName}>T T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Gearbox</Text>
            <Text style={styles.AnswerName}>G</Text>
          </View>
        </View>
      )}

      {/* ----- Box 4: Steering ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(4)}>
        <Text style={styles.Question_Txt_1}>Steering</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 4 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 4 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Steering Type</Text>
            <Text style={styles.AnswerName}>S T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Assisted</Text>
            <Text style={styles.AnswerName}>P A</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Minimum Turning Radius</Text>
            <Text style={styles.AnswerName}>M T R</Text>
          </View>
        </View>
      )}

      {/* ----- Box 5: Suspension Brakes ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(5)}>
        <Text style={styles.Question_Txt_1}>Suspension Brakes</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 5 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 5 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Suspension</Text>
            <Text style={styles.AnswerName}>F S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Suspension</Text>
            <Text style={styles.AnswerName}>R S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Brakes</Text>
            <Text style={styles.AnswerName}>F B</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Brakes</Text>
            <Text style={styles.AnswerName}>R B</Text>
          </View>
        </View>
      )}

      {/* ----- Box 6: Wheels Tyres ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(6)}>
        <Text style={styles.Question_Txt_1}>Wheels Tyres</Text>
        <Text style={styles.Question_Txt_2}>
          <MaterialIcons
            name={openBoxIndex === 6 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {openBoxIndex === 6 && (
        <View style={styles.Answer}>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Type</Text>
            <Text style={styles.AnswerName}>W T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Wheel Size</Text>
            <Text style={styles.AnswerName}>W S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Tyre Size</Text>
            <Text style={styles.AnswerName}>T S</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Spare Tyre</Text>
            <Text style={styles.AnswerName}>S T</Text>
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>PCD</Text>
            <Text style={styles.AnswerName}>P</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
  },
  Question: {
    borderWidth: 0.5,
    borderColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 5,
    elevation: 5,
  },
  Question_Txt_1: {
    // borderWidth: 0.5,
    paddingTop: 7,
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    width: "80%",
  },
  Question_Txt_2: {
    // borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "20%",
    textAlign: "center",
  },
  Answer: {
    borderWidth: 0.5,
    borderColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "lightyellow",
    marginTop: 2,
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    elevation: 5,
  },
  AnswerRow: {
    // borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    flexDirection: "row",
    marginVertical: 1,
  },
  AnswerHeading: {
    // borderWidth: 0.5,
    width: "70%",
    padding: 2,
  },
  AnswerName: {
    // borderWidth: 0.5,
    width: "30%",
    padding: 2,
    textAlign: "center",
  },
});
