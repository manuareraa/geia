import { Image, StyleSheet, Platform, Text } from "react-native";
import {
  useFonts,
  JetBrainsMono_400Regular,
} from "@expo-google-fonts/jetbrains-mono";
import { Button } from "tamagui";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";

import { countState, CountState } from "../../state-management/general-store";
import Animated from "react-native-reanimated";

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    JetBrainsMono_400Regular,
  });

  // Always call Zustand hooks and other hooks consistently
  const countValue = countState((state: CountState) => state.value);
  const increment = countState((state: CountState) => state.increase);
  const decrement = countState((state: CountState) => state.decrease);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Text style={styles.newText}>Welcome! {countValue}</Text>
        <Button size="$3" variant="outlined" onPress={() => increment(100)}>
          Increase
        </Button>
        <Button size="$3" variant="outlined" onPress={() => decrement(2)}>
          Decrease
        </Button>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text style={styles.newText}>Step 1: Try it</Text>
        <Text style={styles.newText}>
          Edit <Text style={styles.newText}>app/(tabs)/index.tsx</Text> to see
          changes. Press{" "}
          <Text style={styles.newText}>
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </Text>{" "}
          to open developer tools.
        </Text>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text style={styles.newText}>Step 2: Explore</Text>
        <Text style={styles.newText}>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </Text>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text style={styles.newText}>Step 3: Get a fresh start</Text>
        <Text style={styles.newText}>
          When you're ready, run{" "}
          <Text style={styles.newText}>npm run reset-project</Text> to get a
          fresh <Text style={styles.newText}>app</Text> directory. This will
          move the current <Text style={styles.newText}>app</Text> to{" "}
          <Text style={styles.newText}>app-example</Text>.
        </Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  newText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 20,
    color: "#fff",
  },
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
});
