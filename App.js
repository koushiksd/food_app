import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import LoadingScreen from "./src/pages/loading";
import { Provider } from "react-redux";
import { store } from "./src/Store/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./src/pages/Home";
import {
  NavigationContainer,
  createStaticNavigation,
  createNativeStackNavigator,
} from "@react-navigation/native";
// import HomePage from "./src/pages/home.jsx";
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
export default function App() {
  const [fontloaded, fonterr] = useFonts({
    "Poppins-Black": require("./src/assets/fonts/Poppins-Black.otf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.otf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.otf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.otf"),
    "Poppins-Light": require("./src/assets/fonts/Poppins-Light.otf"),
  });

  useEffect(() => {
    if (fontloaded || fonterr) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterr]);

  if (!fontloaded && !fonterr) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ title: "Loading", headerShown: false }}
              name="loading"
              component={LoadingScreen}
            />
            <Stack.Screen
              options={{ title: "Home", headerShown: false }}
              name="home"
              component={HomePage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
});
