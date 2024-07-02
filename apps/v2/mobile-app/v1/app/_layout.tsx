import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#f4511e",
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       {/* Optionally configure static options outside the route.*/}
//       {/* <Stack.Screen name="home" options={{}} /> */}
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// import { Stack } from "expo-router";
// import React from "react";
// import { ThemeProvider } from "@react-navigation/native";
// // import { useFonts } from "expo-font";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { TamaguiProvider } from "tamagui";
// import tamaguiConfig from "@/tamagui.config";
// import {
//   useFonts,
//   JetBrainsMono_400Regular,
// } from "@expo-google-fonts/jetbrains-mono";
// import {
//   DarkTheme,
//   DefaultTheme,
//   NavigationContainer,
// } from "@react-navigation/native";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [fontsLoaded] = useFonts({
//     JetBrainsMono_400Regular,
//   });
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync().then(() => setIsReady(true));
//     }
//   }, [fontsLoaded]);

//   if (!isReady) {
//     return null;
//   }

//   return (
//     <TamaguiProvider
//       config={tamaguiConfig}
//       defaultTheme={colorScheme as string}
//     >
//       {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
//       <ThemeProvider value={DefaultTheme}>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       </ThemeProvider>
//     </TamaguiProvider>
//   );
// }
