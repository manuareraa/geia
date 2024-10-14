import React, { useEffect } from "react";
import { Modal, ActivityIndicator, View, StyleSheet } from "react-native";
import { useLoadingStore } from "@/state/store";

const LoadingOverlay = () => {
  const { isLoading } = useLoadingStore();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else {
      console.log("Done loading.");
    }
  }, [isLoading]);

  return (
    <Modal visible={isLoading} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

export default LoadingOverlay;
