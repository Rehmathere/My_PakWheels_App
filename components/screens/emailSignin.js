import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import SyncStorage from "sync-storage";
// Function to validate email format
// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// Function to validate password format
// const validatePassword = (password) => {
//   // Password must be minimum 8 characters and include at least 1 digit
//   const passwordRegex = /^(?=.*\d).{8,}$/;
//   return passwordRegex.test(password);
// };

const emailSignin = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user, dispatch } = useContext(UserContext);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    console.log("Sign Up button pressed");
    navigation.navigate("signUp");
  };

  const handleSignIn = async () => {
    const empty = [];

    if (!email) {
      empty.push("Your Email");
    }
    if (!password) {
      empty.push("Your Password");
    }

    if (empty.length > 0) {
      setEmptyFields(empty);
      return;
    }

    // if (!validateEmail(email)) {
    //   setInvalidEmail(true);
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   setInvalidPassword(true);
    //   return;
    // }

    //api
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/login",
        {
          phoneNumber:email,
          password,
        }
      );

      if (response.data.ok) {
        SyncStorage.set("token", response.data.token);
        dispatch({ type: "LOGIN", payload: response.data.data });
        navigation.navigate("home");
      }

      // SyncStorage.set("token", response.data.token);
      // console.log(response.data);
      // const result = SyncStorage.get("token");
      // console.log(result); // 'bar'
    } catch (error) {
      console.error(error.response.data);
      if (!error.response.data.ok) {
        setLoginError(error.response.data.error);
      }
    }

    // console.log("Signing in...");
    // Perform sign-in logic here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.signInText}>Sign in for AutoFinder</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, styles.boldLabel]}>Phone Number</Text>
          <View style={styles.emailInputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number "
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emptyFields.includes("Email") && (
            <Text style={styles.errorText}>Please enter your email</Text>
          )}
          {/* {invalidEmail && (
            <Text style={styles.errorText}>Invalid email format</Text>
          )} */}
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
          {emptyFields.includes("Password") && (
            <Text style={styles.errorText}>Please enter your password</Text>
          )}
          {loginError && <Text style={{ color: "red" }}>{loginError}</Text>}
          {/* {invalidPassword && (
            <Text style={styles.errorText}>
              Password must be minimum 8 characters and include at least 1 digit
            </Text>
          )} */}
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text>
            Don't have an account?{" "}
            <Text style={styles.signUpText} onPress={handleSignUp}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Popup for empty fields */}
        <Modal
          visible={emptyFields.length > 0}
          animationType="fade"
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.popupTitle}>Please Enter!</Text>
              {emptyFields.map((field) => (
                <Text key={field} style={styles.popupField}>
                  {field}
                </Text>
              ))}
              <TouchableOpacity onPress={() => setEmptyFields([])}>
                <Text style={styles.popupClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupField: {
    fontSize: 16,
    marginBottom: 5,
  },
  popupClose: {
    fontSize: 18,
    color: "blue",
    marginTop: 10,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
    fontWeight: "bold", // Make the label bold
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black", // Black bottom border for input
    fontSize: 16,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
  },
  passwordInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row", // To align the text label 'Hide'/'Show' to the right
    justifyContent: "space-between", // To create space between password input and text label
    alignItems: "center", // Align items vertically
  },
  passwordVisibilityText: {
    color: "grey",
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingVertical: 8,
    paddingLeft: 10,
  },
  signUpButton: {
    marginTop: 30,
    alignItems: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
    color: "#bd2a2a",
    fontWeight: "bold",
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#bd2a2a", //(#ff7f50)
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

export default emailSignin;
