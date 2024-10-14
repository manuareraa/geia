import React from "react";
import { Text, Image } from "react-native";
import { ScrollView, XStack, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import * as Linking from "expo-linking";


export default function BuyCards(props) {
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
            onPress={() => {
              // router.push(`/buy/purchase/${project.projectId}`);
              // open external link in chrome browser
              Linking.openURL(`https://geoblocs.com/project/view/` + project.projectId);
            }}
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
                  source={{ uri: project.metaImages.logo }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
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
            <XStack
              alignItems="center"
              marginBottom="$4"
              paddingHorizontal="$3"
            >
              <FontAwesome name="map-marker" size={18} color="gray" />
              <Text style={{ marginLeft: 5, fontSize: 14, color: "gray" }}>
                {project.metadata.country}
              </Text>
            </XStack>
          </YStack>
        ))}
      </XStack>
    </ScrollView>
  );
}
