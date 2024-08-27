import { router, Link, Stack } from "expo-router";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import { Button } from "tamagui";
import CustomHeader from "@/components/CustomHeader";
import PortfolioScreen from "@/components/custom/PortfolioScreen";

const WalletScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000" },
          headerTitle: (props) => <CustomHeader />,
        }}
      />
      <View style={styles.fullWidth}>
        {/* your wallet text */}
        <View
          style={{
            marginTop: 50,
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            Your Wallet
          </ThemedText>
        </View>

        {/* gray container */}
        <View style={styles.grayContainer}>
          <View style={styles.walletInnerContainer}>
            {/* first container */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <ThemedText
                style={{
                  fontSize: 20,
                  color: "#ffffff",
                }}
              >
                You Own
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 100,
                  color: "#2b8f45",
                  fontFamily: "ManropeExtraBold",
                  lineHeight: 105,
                  paddingVertical: 10,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                54
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 20,
                  color: "#ffffff",
                  marginTop: -20,
                }}
              >
                Geoblocs
              </ThemedText>
            </View>

            {/* second container */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              {/* geoblocs value */}
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 0,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    color: "#ffffff",
                    alignSelf: "flex-end",
                  }}
                >
                  Your Geoblocs Value
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 30,
                    color: "#2b8f45",
                    fontFamily: "ManropeExtraBold",
                    lineHeight: 30,
                    paddingVertical: 10,
                    alignSelf: "flex-end",
                  }}
                >
                  €54
                </ThemedText>
              </View>

              {/* projects supported */}
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: 0,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    color: "#ffffff",
                    alignSelf: "flex-end",
                  }}
                >
                  Projects Supported
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 30,
                    color: "#2b8f45",
                    fontFamily: "ManropeExtraBold",
                    lineHeight: 30,
                    paddingVertical: 10,
                    alignSelf: "flex-end",
                  }}
                >
                  12
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* your portfolio */}
        <View
          style={{
            marginTop: 50, // Reduced margin
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            Your Portfolio
          </ThemedText>
        </View>

        {/* portfolio cards */}
        <View style={{ flex: 1, marginTop:20 }}>
          <PortfolioScreen />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    fontFamily: "ManropeRegular",
  },
  fullWidth: {
    flex: 1, // Ensure this takes up all available space
    width: "100%",
    paddingHorizontal: 20,
  },
  grayContainer: {
    backgroundColor: "rgba(128, 125, 125, 0.31)",
    padding: 30,
    marginTop: 20,
    borderRadius: 40,
    width: "100%",
  },
  walletInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WalletScreen;
