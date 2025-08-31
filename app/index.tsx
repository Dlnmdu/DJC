import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
  SignInSilentlyResponse,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import { useRouter } from "expo-router";

export default function TabTwoScreen() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<
    SignInResponse | SignInSilentlyResponse
  >();

  const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
  const currentUser = GoogleSignin.getCurrentUser();
  const token = GoogleSignin.getTokens();

  console.log("lll user info", userInfo);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setUserInfo(userInfo);
      } catch {
        // nothing to do.
      }
    };

    checkIfSignedIn();
  }, []);

  const signIn = async () => {
    try {
      const response = await GoogleSignin.signIn();
      const user = response?.data?.user;

      if (isSuccessResponse(response)) {
        // you can write this without this method, response.type === "success"
        router.navigate({
          pathname: "/(tabs)/[name]",
          params: {
            name: user?.name || "",
            email: user?.email || "",
            image: user?.photo,
          },
        });

        setUserInfo(response);
        setError("");
      }
    } catch (e: any) {
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  console.log("lll userInfo response", userInfo);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}>
        This is first screen
      </Text>
      <Button title="Go to About" onPress={() => router.navigate("/(tabs)")} />

      {error ? <Text>{JSON.stringify(error)}</Text> : null}
      {userInfo?.data?.idToken ? (
        <>
          <Text>{userInfo?.data?.user.name}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      )}
    </View>
  );
}
