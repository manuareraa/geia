import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "@react-native-community/blur";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        // tabBarStyle: {
        //   backgroundColor: "#f4511e",
        //   height: 75,
        //   paddingBottom: 15, // Add margin to adjust height without increasing space between icon and label
        // },
        // tabBarLabelStyle: {
        //   marginTop: -10, // Adjust the margin to bring the label closer to the icon
        // },
        // tabBarIconStyle: {
        //   marginBottom: 0, // Adjust the margin to bring the icon closer to the label
        // },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.32)" }}>
            <BlurView style={{ flex: 1 }} blurType="light" blurAmount={17.7} />
          </View>
        ),
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.32)",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          height: 75,
          paddingBottom: 15,
        },
        tabBarLabelStyle: {
          marginTop: -10, // Adjust the margin to bring the label closer to the icon
        },
        tabBarIconStyle: {
          marginBottom: 0, // Adjust the margin to bring the icon closer to the label
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
          // href: null,
        }}
      />

      <Tabs.Screen
        name="wallet/wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
          href: null,
        }}
      />
      {/* <Tabs.Screen
        name="buy/index"
        options={{
          title: "Buy",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="redeem/index"
        options={{
          title: "Redeem",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="auth/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
          href: null,
        }}
      /> */}
    </Tabs>
  );
}
