import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { ScrollView, XStack, YStack } from "tamagui";
import { useLocalSearchParams, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { BackHandler } from "react-native";
import CustomHeader from "@/components/CustomHeader";
import BuyCard from "@/components/custom/BuyCard";
import { StyleSheet } from "react-native";
import { useAuthStore } from "@/state/store";

export default function Purchase() {
  const { walletAddress } = useAuthStore();
  // Retrieve the `id` parameter from the URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // State variables for the increment/decrement value
  const [value, setValue] = useState(0);

  // Handle back button
  useEffect(() => {
    const backAction = () => {
      router.push("buy/buy");
      return true; // Return true to stop default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup when component unmounts
  }, []);

  // Handle Increment
  const handleIncrement = () => {
    if (value < 200000) {
      setValue((prevValue) => prevValue + 1);
    } else {
      Alert.alert("Value cannot exceed 200,000");
    }
  };

  // Handle Decrement
  const handleDecrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    } else {
      Alert.alert("Value cannot be less than 0");
    }
  };

  // Handle Buy Action
  const handleBuy = () => {
    console.log("Wallet: ",  walletAddress);
    // Safety check before buying
    if (value === 0) {
      Alert.alert("Please select at least 1 item to buy.");
      return;
    } else if (value > 200000) {
      Alert.alert("You cannot buy more than 200,000 items.");
      return;
    }
    console.log("Buying:", value);
    Alert.alert(`Successfully bought ${value} items.`);
  };

  // Handle manual input (only numeric values)
  const handleInputChange = (input) => {
    const numericValue = input.replace(/[^0-9]/g, ""); // Allow only numbers
    const parsedValue = parseInt(numericValue || 0, 10);
    if (parsedValue <= 200000) {
      setValue(parsedValue);
    } else {
      Alert.alert("Value cannot exceed 200,000");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000" },
          headerTitle: (props) => <CustomHeader />,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        {/* Display BuyCard */}
        <BuyCard />

        {/* Increment/Decrement and Input Section */}
        <View style={styles.inputContainer}>
          <XStack gap="$2" alignItems="center">
            {/* <Button title="-" onPress={handleDecrement} /> */}
            <TouchableOpacity
              onPress={handleDecrement}
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 15,
                alignItems: "center",
              }}
            >
              <FontAwesome name="minus" size={12} color="black" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={value.toString()}
              onChangeText={handleInputChange}
            />
            <TouchableOpacity
              onPress={handleIncrement}
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 15,
                alignItems: "center",
              }}
            >
              <FontAwesome name="plus" size={12} color="black" />
            </TouchableOpacity>
          </XStack>
        </View>

        {/* Buy Button */}
        <View style={{ width: 100, alignSelf: "center", marginTop: 20 }}>
          <TouchableOpacity
            onPress={handleBuy}
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#2b8f45", fontSize: 16 }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: "100%", // Ensure full width
  },
  scrollView: {
    flex: 1,
    width: "100%", // Ensure ScrollView takes up full width
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%", // Ensure the content takes up full width
    justifyContent: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
    width: "100%", // Ensure the input container takes full width
  },
  input: {
    width: 100,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
});
