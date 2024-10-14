import React from "react";
import { Text, Image } from "react-native";
import { ScrollView, XStack, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

export default function PortfolioScreen(props) {
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

  return (
    <ScrollView>
      <XStack
        flexWrap="wrap"
        justifyContent="space-between"
        paddingHorizontal="$2"
        // gap="$2"
        // columnGap="$4"
      >
        {props.projects.map((project) => (
          <YStack
            key={project.projectId}
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
              <YStack width="100%" height="100%">
                <Image
                  source={{ uri: project.nft }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                />
              </YStack>
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
              {project.projectName}
            </Text>
            {/* <XStack
              alignItems="center"
              marginBottom="$0"
              paddingHorizontal="$3"
            >
              <FontAwesome name="map-marker" size={18} color="gray" />
              <Text style={{ marginLeft: 5, fontSize: 14, color: "gray" }}>
                {project.location}
              </Text>
            </XStack> */}

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
                  {project.tokenBalance}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>Geoblocs</Text>
              </YStack>
              {/* <YStack alignItems="center">
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
                >
                  ${project.value.toFixed(2)}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>Value</Text>
              </YStack> */}
            </XStack>
          </YStack>
        ))}
      </XStack>
    </ScrollView>
  );
}
