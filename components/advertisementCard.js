import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const AdvertisementCard = ({
  title,
  description,
  imageSource,
  onPress,
  buttonText,
  buttonColor,
  titleColor,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AdvertisementCard;
