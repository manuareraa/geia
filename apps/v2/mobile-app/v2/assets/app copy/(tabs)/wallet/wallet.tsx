import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Stack, router } from "expo-router";
import { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "tamagui";

export default function WalletScreen() {
  // const router = useRouter();
  useEffect(() => {
    console.log("WalletScreen");
  }, []);

  const goToLogin = () => {
    console.log("Going to Login Screen..");
    router.navigate("/login");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Wallet",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ThemedText style={styles.title}>Wallet</ThemedText>
      {/* <Link href="auth/login" asChild>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            console.log("Go to Auth Screen");
          }}
        >
          <ThemedText
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "JetBrainsMonoRegular",
            }}
          >
            Go to Auth Screen
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="auth/login" style={styles.link}>
        Login
      </Link> */}
      {/* <Button onPress={() => router.navigate("/auth/login")}>Login</Button> */}
      {/* <Link href="auth/login" style={styles.link}>
        {" "}
        Login{" "}
      </Link> */}
      <Button onPress={goToLogin}>Login</Button>
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
  title: {
    fontSize: 40,
    fontFamily: "JetBrainsMonoRegular",
    lineHeight: 40,
  },
  pressable: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    color: "white",
  },
});
