import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter, Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "tamagui";

export default function LoginScreen() {
  // const router = useRouter();

  useEffect(() => {
    console.log("LoginScreen");
  }, []);

  const goToWallet = () => {
    console.log("Going to Wallet Screen..");
    // router.navigate("/wallet/wallet");
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ThemedText style={styles.title}>Login Page</ThemedText>
      {/* <Button
        onPress={() => {
          console.log("Going to Wallet Screen..");
          router.navigate("/wallet/index");
        }}
      >
        Go to Wallett
      </Button> */}
      {/* <Link href="/wallet/index" style={styles.link}>
        Go to Wallet
      </Link> */}
      <Button onPress={goToWallet}>Go to Wallet</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    fontFamily: "JetBrainsMonoRegular",
  },
  text: {
    fontSize: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    color: "white",
  },
  title: {
    fontSize: 40,
    fontFamily: "JetBrainsMonoRegular",
    lineHeight: 40,
  },
});
