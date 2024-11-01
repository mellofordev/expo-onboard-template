import { DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Image, Alert, Pressable } from "react-native";
import { useState } from "react";
import React from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link, useRouter } from "expo-router";
import { Separator } from "~/components/ui/separator";
import { Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  Directions,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
export default function Profile() {
  const { height } = Dimensions.get("window");
  const router = useRouter();
  const translateY = useSharedValue(0);
  const startY = useSharedValue({ y: 0 });
  const sheetGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + startY.value.y;
      translateY.value = Math.max(translateY.value, -height + 600);
      translateY.value = Math.min(translateY.value, 0);
      // console.log(translateY.value,height);
    })
    .onFinalize((event) => {
      if (event.translationY > height / 4) {
        translateY.value = withSpring(0);
      } else {
        translateY.value = withSpring(-height + 550);
      }
    });
  const sheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const logout = async () => {
    await AsyncStorage.setItem("logged", "false");
    router.replace("/(app)");
   }
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 h-full  flex-col items-start justify-between container mx-auto p-1 bg-[#1b1b1b] text-white">
        <View className="flex flex-col gap-5 w-full bg-transparent  h-1/2 container p-5">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-3xl text-white" style={{fontFamily:'InstrumentSerif-Italic'}}>name</Text>
            <View className="flex flex-col ">
              <Image
                source={{ uri: 'https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?fm=jpg&q=60&w=3000' }}
                className="h-12 w-12 rounded-full object-cover"
              />
            </View>
          </View>
          <Text className="text-[#767676] font-bold text-3xl">
            Hello
          </Text>
          <Text className="text-white text-2xl font-medium">
            this is the starting template
          </Text>
        </View>
        <GestureDetector gesture={sheetGesture}>
          <Animated.View
            style={{ height: height, ...sheetStyle }}
            className="flex flex-col  bg-white  h-full  w-full container p-3 rounded-3xl gap-3"
          >
            <Text className="text-[#1b1b1b] font-bold text-3xl" style={{fontFamily:'InstrumentSerif-Italic'}}>gesture</Text>
            <Separator orientation="horizontal" />
            <Button onPress={logout}><Text>logout</Text></Button>
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </>
  );
}
