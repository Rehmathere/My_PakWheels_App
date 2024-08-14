import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

export default function New_Cars_Detail_F() {
  const [openBoxIndex, setOpenBoxIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenBoxIndex(openBoxIndex === index ? null : index);
  };

  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <Text style={styles.AnswerName}><AntDesign name="checkcircle" size={19} color="green" /></Text>
      ) : (
        <Text style={styles.AnswerName}><AntDesign name="closecircle" size={19} color="red" /></Text>
      );
    }
    return <Text style={styles.AnswerName}>{value}</Text>;
  };

  return (
    <View style={styles.container}>
      {/* ----- Box 1: Safety ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(1)}>
        <Text style={styles.Question_Txt_1}>Safety</Text>
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
            <Text style={styles.AnswerHeading}>Number of Airbags</Text>
            {renderValue(123)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Number of Seatbelts</Text>
            {renderValue(123)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Driver Seat Belt Warning</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Passenger Seat Belt Warning</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Door Ajar Warning</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Adjustable Seats</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Vehicle Stability Control</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Traction Control</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Hill Start Assist Control</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Hill Descent Control</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Child Safety Lock</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Speed Sensing Auto Door Lock</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Anti Lock Braking System</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Brake Assist</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Electronic Brake Force Distribution</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Brake Override System</Text>
            {renderValue(false)}
          </View>
        </View>
      )}

      {/* ----- Box 2: Exterior ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(2)}>
        <Text style={styles.Question_Txt_1}>Exterior</Text>
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
            <Text style={styles.AnswerHeading}>Alloy Wheels</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Colored Outside Door Handles</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Body Colored Bumpers</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Sun Roof</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Moon Roof</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Fog Lamps</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Roof Rail</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Side Steps</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Adjustable Headlights</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Daytime Running Lights</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Headlight Washer</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Xenon Headlamps</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Spoiler</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Wiper</Text>
            {renderValue(true)}
          </View>
        </View>
      )}

      {/* ----- Box 3: Instrumentation ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(3)}>
        <Text style={styles.Question_Txt_1}>Instrumentation</Text>
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
            <Text style={styles.AnswerHeading}>Tachometer</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Information Cluster</Text>
            {renderValue("123")}
          </View>
        </View>
      )}

      {/* ----- Box 4: Infotainment ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(4)}>
        <Text style={styles.Question_Txt_1}>Infotainment</Text>
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
            <Text style={styles.AnswerHeading}>CD Player</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>DVD Player</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Number of Speakers</Text>
            {renderValue(123)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Speakers</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Speakers</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Bluetooth Connectivity</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>USB and Auxiliary Cable</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Seat Entertainment</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Android Auto</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Apple CarPlay</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Touchscreen</Text>
            {renderValue("123")}
          </View>
        </View>
      )}

      {/* ----- Box 5: Comfort and Convenience ----- */}
      <TouchableOpacity style={styles.Question} onPress={() => toggleAnswer(5)}>
        <Text style={styles.Question_Txt_1}>Comfort and Convenience</Text>
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
            <Text style={styles.AnswerHeading}>Air Conditioner</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Climate Control</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Air Purifier</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear AC Vents</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Heater</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Heated Seats</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Front Seat Ventilation</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Seat Ventilation</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Remote Controlled Boot</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Navigation System</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Keyless Entry</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Push Button Start</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Central Locking</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Cruise Control</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Parking Sensors</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Parking Camera</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Auto Rain Sensing Wipers</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Auto Headlamps</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Windows</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Steering</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Door Locks</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Power Folding Mirrors</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Wiper</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Rear Defogger</Text>
            {renderValue(false)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Follow Me Home Headlamps</Text>
            {renderValue(true)}
          </View>
          <View style={styles.AnswerRow}>
            <Text style={styles.AnswerHeading}>Headlamp Beam Adjuster</Text>
            {renderValue(true)}
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
    // backgroundColor: "lightgreen",
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
    paddingVertical: 3,
    flexDirection: "row",
    marginVertical: 0.5,
  },
  AnswerHeading: {
    // borderWidth: 0.5,
    width: "75%",
    padding: 2,
  },
  AnswerName: {
    // borderWidth: 0.5,
    width: "25%",
    padding: 2,
    textAlign: "center",
  },
});
