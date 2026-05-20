import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RoutesTabs from "./src/routes/RoutesTabs";
import { MicrophonePermissionGate } from "./src/components/Permitions/Permitions";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MicrophonePermissionGate>
          <RoutesTabs />
        </MicrophonePermissionGate>
        <StatusBar style="light" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
