import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({ onSearch = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const navigation = useNavigation();

  const suggestions = [
    { text: "Free Ads", action: () => navigation.navigate("homeFreeAds") },
    { text: "Premium Ads", action: () => navigation.navigate("homePremiumAds") },
    { text: "List It For You", action: () => navigation.navigate("homeListItForYou", { service: "001" }) },
    { text: "Car Inspection", action: () => navigation.navigate("homeCarInspection", { service: "002" }) },
    { text: "Buy Car For Me", action: () => navigation.navigate("homeBuyCarForMe", { service: "003" }) },
    { text: "Rent A Car", action: () => navigation.navigate("homeRentACar") },
    { text: "Auto Parts", action: () => navigation.navigate("Auto_Parts") },
    { text: "Bikes", action: () => navigation.navigate("Rent_Bike") },
    { text: "New Cars", action: () => navigation.navigate("New_Cars") },
  ];

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches]);
      }
      setSearchQuery("");
      setShowDialog(true);
    }
  };

  const handleInputChange = (query) => {
    setSearchQuery(query);
    setShowDialog(query.length > 0);
  };

  const handleDelete = (item) => {
    setRecentSearches(recentSearches.filter(search => search !== item));
  };

  const handleSuggestionClick = (action) => {
    setShowDialog(false);
    action();
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <View style={styles.container}>
        <AntDesign
          name="search1"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search "
          onChangeText={handleInputChange}
          value={searchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {showDialog && (
        <View style={styles.dialogBox}>
          <Text style={styles.resultTitle}>Search Results:</Text>
          <FlatList
            data={filteredSuggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionClick(item.action)}>
                <Text style={styles.resultItem}>{item.text}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.resultTitle}>Recent Searches:</Text>
          <FlatList
            data={recentSearches}
            renderItem={({ item }) => (
              <View style={styles.recentSearchItem}>
                <Text style={styles.resultItem}>{item}</Text>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <MaterialIcons name="delete-forever" size={20} color="#bd2a2a" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: "#bd2a2a",
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "black",
  },
  searchButton: {
    backgroundColor: "#bd2a2a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
  dialogBox: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    borderColor: "#bd2a2a",
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultItem: {
    fontSize: 14,
    paddingVertical: 2,
  },
  recentSearchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SearchBar;
