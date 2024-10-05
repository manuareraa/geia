import React, { useEffect } from "react";
import { Text } from "react-native";
import { ScrollView, XStack, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import BuyCard from "@/components/custom/BuyCard";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import { Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function Purchase() {
  // Retrieve the `id` parameter from the URL
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    // Log the `id` parameter to the console
    console.log(id);
  }, [id]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000" },
          headerTitle: (props) => <CustomHeader />,
        }}
      />
      <View style={styles.fullWidth}>
        {/* projects title */}
        <View
          style={{
            marginTop: 0, // Reduced margin
          }}
        >
          {/* <ThemedText
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            Our Projects
          </ThemedText> */}
        </View>
        <BuyCard />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    fontFamily: "ManropeRegular",
  },
  fullWidth: {
    flex: 1, // Ensure this takes up all available space
    width: "100%",
    paddingHorizontal: 20,
  },
});
