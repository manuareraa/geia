import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import logoIcon from "../assets/images/geoblocs-icon.png";

export default function CustomHeader(props) {
  return (
    <ThemedView style={styles.headerContainer}>
      <Image source={logoIcon} style={styles.logo} />
      <ThemedText style={styles.title}>Geoblocs</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginTop: 25,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: "#2b8f45",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ManropeExtraBold",
  },
});
