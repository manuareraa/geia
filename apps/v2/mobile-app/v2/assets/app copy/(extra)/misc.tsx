import { router } from "expo-router";
import { Button, Text, View } from "tamagui";
import { StyleSheet } from "react-native";

const MiscScreen = () => {
  const goToHome = () => {
    console.log("Going to Home Screen..");
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Misc Page</Text>
      <Button onPress={goToHome}>Go to Home</Button>
    </View>
  );
};

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
    color: "#fff",
  },
});

export default MiscScreen;
