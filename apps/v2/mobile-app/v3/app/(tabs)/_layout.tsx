import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: "rgba(0, 0, 0, 0.32)",
          borderTopWidth: 1,
          // borderTopColor: "rgba(0, 0, 0, 0.1)",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          marginTop: -5, // Adjust the margin to bring the label closer to the icon
        },
        tabBarIconStyle: {
          marginBottom: -10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "green" : color}
            />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="wallet/wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={focused ? "green" : "black"}
              size={25}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={{
                color: focused ? "green" : "black",
                fontFamily: "JetBrainsMono",
                fontSize: 10,
              }}
            >
              Wallet
            </ThemedText>
          ),
        }}
      />
      <Tabs.Screen
        name="buy/buy"
        options={{
          title: "Buy",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={focused ? "green" : "black"}
              size={25}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={{
                color: focused ? "green" : "black",
                fontFamily: "JetBrainsMono",
                fontSize: 10,
              }}
            >
              Buy
            </ThemedText>
          ),
        }}
      />
    </Tabs>
  );
}
