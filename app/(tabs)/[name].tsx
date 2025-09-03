import { Image, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { name, email, image } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{ uri: image }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

//Add cooment to test build
