import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const FooterContact = ({
  onCallPress,
  onSMSPress,
  // onChatPress,
  onWhatsappPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCallPress}
        style={[styles.button, styles.callButton]}
      >
        <Text style={styles.callButton}>Call Seller</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={onSMSPress} style={styles.iconButton}>
          <Image
            source={require("../assets/smsIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>SMS</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onChatPress} style={styles.iconButton}>
          <Image
            source={require("../assets/chatIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onWhatsappPress} style={styles.iconButton}>
          <Image
            source={require("../assets/whatsappIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    // height: 50,
  },
  buttonText: {
    color: "#2884ec",
    fontSize: 12,
    fontWeight: "bold",
  },
  callButton: {
    backgroundColor: "#bd2a2a",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default FooterContact;
