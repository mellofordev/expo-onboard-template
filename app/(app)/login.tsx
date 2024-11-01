import { DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Image, Alert } from "react-native";
import { useState } from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import * as Haptic from 'expo-haptics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export default function Login() {
  const login = async () => {
    await AsyncStorage.setItem('logged','true');
    router.replace("/(home)");
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
  }
  return (
    <>
      <StatusBar style="auto" />
      <Image
        className="h-1/2 w-full"
        source={{
          uri: "https://img.freepik.com/free-vector/hand-drawn-botanical-garden-illustration_23-2150176599.jpg?t=st=1729516288~exp=1729519888~hmac=e393aa21b12d3cdca2e6dc0422239c3c14cd07f8b4f79f3ecfcf8befd2001a58&w=1380",
        }}
      />
      <SafeAreaView>
      <View className="flex flex-col container mx-auto p-2">
      <Button className="w-full rounded-none" onPress={login}>
              <Text className="font-bold">login</Text>
        </Button>
      </View>
      </SafeAreaView>
    </>
  );
}
