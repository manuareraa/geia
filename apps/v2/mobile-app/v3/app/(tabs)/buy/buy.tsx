import { router, Link, Stack } from "expo-router";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import { Button } from "tamagui";

import CustomHeader from "@/components/CustomHeader";
import PortfolioScreen from "@/components/custom/PortfolioScreen";
import BuyCards from "@/components/custom/BuyCards";
import { useEffect } from "react";
import { useSummaryStore, useLoadingStore } from "@/state/store";

const BuyScreen = () => {
  const { fetchSummary, orgSummary, fetchProjectsSummary, projects } =
    useSummaryStore();
  const { setLoading } = useLoadingStore();

  const fetchAllProjectsData = async () => {
    if (projects.length === 0) {
      setLoading(true);
    }
    try {
      console.log("Fetching all projects data");
      const response = await fetchProjectsSummary();
    } catch (error) {
      console.error("Error fetching all projects data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjectsData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000" },
          headerTitle: (props) => <CustomHeader />,
        }}
      />
      <View style={styles.fullWidth}>
        {/* projects title */}
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
            Our Projects
          </ThemedText>
        </View>

        {/* cards */}
        <View style={{ flex: 1, marginTop: 20 }}>
          <BuyCards projects={projects} />
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
});

export default BuyScreen;
