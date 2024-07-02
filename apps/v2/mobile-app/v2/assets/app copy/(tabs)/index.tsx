import { Image, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

import WalletScreen from "./wallet/wallet";
import { Button } from "tamagui";

export default function HomeScreen() {
  // return <WalletScreen />;
  // return null;

  const goToWallet = () => {
    console.log("Going to Wallet Screen..");
    // router.navigate("/wallet/wallet");
    router.navigate("/misc");
    // router.navigate("/login");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ThemedText style={styles.title}>Home</ThemedText>
      <View style={styles.stepContainer}>
        <ThemedText>Step 1: Install Expo Go</ThemedText>
        <ThemedText>Step 2: Scan QR Code</ThemedText>
        <ThemedText>Step 3: Profit</ThemedText>
      </View>
      <Button onPress={goToWallet}>Go to Wallet</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    fontFamily: "JetBrainsMonoRegular",
  },
  title: {
    fontSize: 40,
    fontFamily: "JetBrainsMonoRegular",
    lineHeight: 40,
  },
});
