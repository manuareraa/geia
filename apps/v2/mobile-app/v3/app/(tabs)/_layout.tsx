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
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
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
          tabBarStyle: { display: "none" }, // This hides the tab bar on the HomeScreen
          href: null,
          headerShown: false,
        }}
        // options={{
        //   title: "Home",
        //   tabBarIcon: ({ color, focused }) => (
        //     <TabBarIcon
        //       name={focused ? "home" : "home-outline"}
        //       color={focused ? "green" : color}
        //     />
        //   ),
        //   href: null,
        // }}
      />
      <Tabs.Screen
        name="buy/purchase/[id]"
        options={{
          tabBarStyle: { display: "none" }, // This hides the tab bar on the HomeScreen
          href: null,
          // headerShown: false,
        }}
        // options={{
        //   title: "Home",
        //   tabBarIcon: ({ color, focused }) => (
        //     <TabBarIcon
        //       name={focused ? "home" : "home-outline"}
        //       color={focused ? "green" : color}
        //     />
        //   ),
        //   href: null,
        // }}
      />
      <Tabs.Screen
        name="wallet/wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "wallet-outline" : "wallet-outline"}
              color={focused ? "#03fc5a" : "white"}
              size={25}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={{
                color: focused ? "#03fc5a" : "white",
                fontFamily: "ManropeExtraBold",
                fontSize: 12,
              }}
            >
              Your Wallet
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
              name={focused ? "leaf-outline" : "leaf-outline"}
              color={focused ? "#03fc5a" : "white"}
              size={25}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={{
                color: focused ? "#03fc5a" : "white",
                fontFamily: "ManropeExtraBold",
                fontSize: 12,
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
