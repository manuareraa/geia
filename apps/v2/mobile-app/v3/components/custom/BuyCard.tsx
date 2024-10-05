import React from "react";
import { Text } from "react-native";
import { ScrollView, XStack, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { StyleSheet } from "react-native";

export default function BuyCard() {
  const project = {
    id: 1,
    name: "Project Alpha",
    location: "Phillipines",
    geoblocs: 12,
    value: 16.25,
  };

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
            marginTop: 50, // Reduced margin
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            Our Projects
          </ThemedText>
        </View>

        {/* cards */}
        <View style={{ flex: 1, marginTop: 20 }}>
          <YStack
            key={project.id}
            width="48%" // Adjusted width to ensure two cards fit side by side
            backgroundColor="#F3F3F3"
            borderRadius="$4"
            overflow="hidden"
            marginBottom="$4"
            // padding="$3"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
          >
            {/* Image Placeholder */}
            <YStack
              height={120}
              backgroundColor="#E0E0E0"
              borderRadius="$4"
              marginBottom="$3"
            >
              <YStack width="100%" height="100%" backgroundColor="gray" />
            </YStack>

            {/* Info Section */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 3,
                paddingHorizontal: 10,
              }}
            >
              {project.name}
            </Text>
            <XStack
              alignItems="center"
              marginBottom="$0"
              paddingHorizontal="$3"
            >
              <FontAwesome name="map-marker" size={18} color="gray" />
              <Text style={{ marginLeft: 5, fontSize: 14, color: "gray" }}>
                {project.location}
              </Text>
            </XStack>

            {/* Geoblocs and Value */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              padding="$2.5"
              paddingHorizontal="$4"
            >
              <YStack alignItems="center">
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
                >
                  {project.geoblocs}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>Geoblocs</Text>
              </YStack>
              <YStack alignItems="center">
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
                >
                  ${project.value.toFixed(2)}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>Value</Text>
              </YStack>
              {/* <YStack
                width={30}
                height={30}
                borderRadius={15}
                alignItems="center"
                justifyContent="center"
                backgroundColor="#E0E0E0"
              >
                <FontAwesome name="arrow-right" size={18} color="gray" />
              </YStack> */}
            </XStack>
          </YStack>
        </View>
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
