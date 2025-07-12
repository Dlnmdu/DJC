import { Button, Text, View } from "react-native";

import { useRouter } from "expo-router";

export default function TabTwoScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}>
        This is first screen
      </Text>
      <Button title="Go to About" onPress={() => router.navigate("/(tabs)")} />
    </View>
  );
}
