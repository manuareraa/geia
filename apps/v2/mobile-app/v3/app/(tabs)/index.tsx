import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView"; // If you have a themed view, else replace with View
import { ThemedText } from "@/components/ThemedText"; // If you have a themed text, else replace with Text
import { Button } from "tamagui";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAuthStore } from "@/state/store";
import { useRoute } from "@react-navigation/native";

import bgImage from "../../assets/images/homebg.png";
import icon from "../../assets/images/geoblocs-icon.png";
import { router } from "expo-router";

export default function HomeScreen() {
  const { setWalletAddress, setAuthStatus } = useAuthStore();
  const route = useRoute();

  console.log("Route:", route);

  function extractTokenFromUrl(url) {
    const parsedUrl = new URL(url);
    console.log("Parsed URL:", parsedUrl);
    // return parsedUrl.searchParams.get("token"); // Replace 'token' with the actual query parameter key in your URL
  }

  useEffect(() => {
    const handleUrl = (url) => {
      const parsedUrl = Linking.parse(url);
      if (parsedUrl.queryParams && parsedUrl.queryParams.address) {
        const address = parsedUrl.queryParams.address;
        setAuthStatus(true);
        setWalletAddress(address);
        console.log("Address received:", address);
        // navigate to wallet/wallet
        router.replace("wallet/wallet");        
      }
    };

    // Get the initial URL (if the app was opened via a deep link)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    // Listen to incoming URLs
    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    return () => {
      // Clean up the event listener on unmount
      subscription.remove();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Top Icons Placeholder */}
      <View style={styles.iconsContainer}>
        <Image
          source={icon}
          style={{
            width: 70,
            height: 70,
            borderRadius: 25,
          }}
        />
      </View>

      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <Image
          source={bgImage}
          style={{
            width: 300,
            height: 300,
            borderRadius: 100,
          }}
        />
      </View>

      {/* Text Placeholder */}
      <View style={styles.textContainer}>
        <ThemedText style={styles.text}>
          Bringing radical transparency to{"\n"}
          <Text style={styles.highlight}>biosphere regeneration</Text>
        </ThemedText>
      </View>

      <View
        style={{
          height: 100,
        }}
      ></View>

      {/* a view container fixed to the bottom of the screen */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#2b8f45",
          height: 150,
          width: "100%",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onPress={async () => {
            console.log("Get Started button pressed");
            router.push("wallet/wallet");
            // const authUrl = "https://geoblocs.com/mobile-verification"; // Replace with your authentication URL
            // const redirectUrl = Linking.createURL("redirect");

            // try {
            //   const result = await WebBrowser.openAuthSessionAsync(
            //     authUrl,
            //     redirectUrl
            //   );

            //   if (result.type === "success" && result.url) {
            //     const token = extractTokenFromUrl(result.url);
            //   } else {
            //     console.log("Authentication was cancelled or failed");
            //   }
            // } catch (error) {
            //   console.error("Error during authentication:", error);
            // }
          }}
          style={{
            backgroundColor: "#000",
            width: "80%",
            padding: 5,
            borderRadius: 10,
            alignItems: "center",
            height: 55,
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "ManropeMedium",
            }}
          >
            Verify
          </ThemedText>
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // black background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "ManropeRegular",
  },
  iconsContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // width: "30%",
    // marginBottom: 30,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 25, // making the icon round
  },
  imageContainer: {
    marginBottom: 30,
    width: 300,
    height: 300,
    // backgroundColor: "gray", // placeholder for the main image
    borderRadius: 100, // making the image round
  },
  textContainer: {
    marginBottom: 30,
    alignItems: "center",
    // height: 100,
  },
  text: {
    color: "#FFF", // white text color
    fontSize: 40,
    textAlign: "center",
    lineHeight: 45,
    fontFamily: "ManropeMedium",
  },
  highlight: {
    color: "#2b8f45", // green color
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    backgroundColor: "#FFF", // white background
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#77B255", // green background for button
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF", // white text color
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
  },
});
