import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";

// Function to validate email format
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to validate password format
const validatePassword = (password) => {
  // Password must be minimum 8 characters and include at least 1 digit
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const signUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    const empty = [];

    // Check each field and add it to the empty array if it's empty
    if (!name) {
      empty.push("Your Name");
    }
    if (!phoneNumber) {
      empty.push(" Your Phone Number");
    }
    if (!email) {
      empty.push(" Your Email Address");
    }
    if (!password) {
      empty.push("Your Password");
    }
    if (!address) {
      empty.push("Your Address");
    }

    // Update the state with the empty fields
    setEmptyFields(empty);

    // If any field is empty, stop sign-up process and display error message
    if (empty.length > 0) {
      console.log("Please fill all required fields");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setInvalidEmail(true);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setInvalidPassword(true);
      return;
    }

    // Validate phone number format
    const phoneNumberRegex = /^(?:(\+92)?(0092)?(92)?(0)?)?(3)([0-9]{9})$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      setInvalidPhoneNumber(true);
      return;
    }

    try {
      // Call the API to sign up
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/signup",
        {
          name,
          password,
          email,
          address,
          phoneNumber,
        }
      );
      console.log(response.data);

      navigation.navigate("emailSignin");

      // Handle success, navigate to the next screen, show a success message, etc.
    } catch (error) {
      // Handle error, show an error message, etc.
      console.error(error.response.data);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.signInText}>Sign Up for AutoFinder</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />
          {(emptyFields.includes("Name") || (name && name.length < 3)) && (
            <Text style={styles.errorText}>
              Name must have at least 3 characters
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>
            Phone Number
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#A0A0A0"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {invalidPhoneNumber && (
            <Text style={styles.errorText}>Invalid phone number format</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
          />
          {invalidEmail && (
            <Text style={styles.errorText}>Invalid email format</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.passwordVisibilityText}>
                {passwordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          {invalidPassword && (
            <Text style={styles.errorText}>
              Password must be minimum 8 characters and include at least 1 digit
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor="#A0A0A0"
            value={address}
            onChangeText={setAddress}
          />
          {(emptyFields.includes("Address") ||
            (address && address.length < 4)) && (
            <Text style={styles.errorText}>Incorrect format</Text>
          )}
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signInButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {/* Popup for empty fields */}
      <Modal visible={emptyFields.length > 0} animationType="slide" transparent>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Please Enter !</Text>
          {emptyFields.map((field) => (
            <Text key={field} style={styles.popupField}>
              {field}
            </Text>
          ))}
          <TouchableOpacity onPress={() => setEmptyFields([])}>
            <Text style={styles.popupClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  signInText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 120,
    textAlignVertical: "center",
    textAlign: "left",
    color: "#bd2a2a",
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  boldLabel: {
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 16,
    color: "black",
    paddingVertical: 2,
    paddingLeft: 10,
  },
  passwordInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
  },
  passwordVisibilityText: {
    color: "grey",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#bd2a2a",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Popup styles
  popup: {
    backgroundColor: "white",
    padding: 20,
    margin: 50,
    borderRadius: 10,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#bd2a2a",
  },
  popupField: {
    fontSize: 16,
    marginBottom: 5,
  },
  popupClose: {
    color: "blue",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  // Error text style
  errorText: {
    color: "red",
    fontSize: 14,
  },
});

export default signUp;

