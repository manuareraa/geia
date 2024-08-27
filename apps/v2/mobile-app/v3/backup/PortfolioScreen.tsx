import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function PortfolioScreen() {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      location: "Phillipines",
      geoblocs: 12,
      value: 16.25,
    },
    {
      id: 2,
      name: "Project Beta",
      location: "India",
      geoblocs: 8,
      value: 10.0,
    },
    {
      id: 3,
      name: "Project Gamma",
      location: "Kenya",
      geoblocs: 5,
      value: 7.5,
    },
    // Add more projects as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      {/* Image section */}
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}></View>
      </View>

      {/* Info section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={18} color="gray" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        {/* Geoblocs and Value */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{item.geoblocs}</Text>
            <Text style={styles.statLabel}>Geoblocs</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>${item.value.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Value</Text>
          </View>
          {/* <View style={styles.arrowContainer}>
            <FontAwesome name="arrow-right" size={18} color="gray" />
          </View> */}
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={projects}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // This makes the FlatList a grid with 2 columns
      columnWrapperStyle={styles.columnWrapper} // Style for the row
      contentContainerStyle={styles.gridContainer}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 0,
    paddingTop: 10,
    rowGap: 10,
    columnGap: 25,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardContainer: {
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    overflow: "hidden",
    width: Dimensions.get("window").width / 2 - 20, // Ensures two columns
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#E0E0E0",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
  },
  arrowContainer: {
    backgroundColor: "#E0E0E0",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
