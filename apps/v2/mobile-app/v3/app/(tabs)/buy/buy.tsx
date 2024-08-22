import { router, Link, Stack } from "expo-router";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import { Button } from "tamagui";

import CustomHeader from "@/components/CustomHeader";

const BuyScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          // title: "Geoblocs",
          headerStyle: { backgroundColor: "#000" },
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          //   fontFamily: "ManropeExtraBold",
          // },

          headerTitle: (props) => <CustomHeader />,
        }}
      />
      <View>
        <ThemedText style={{ fontFamily: "JetBrainsMono" }}>Buy</ThemedText>
        <ThemedText style={{ fontFamily: "JetBrainsMonoRegular" }}>
          custom fonts such as this one.
        </ThemedText>
        <Button
          onPress={() => {
            router.push("/login");
          }}
        >
          Go to Login
        </Button>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default BuyScreen;
