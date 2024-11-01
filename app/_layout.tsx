import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout(){
    return(
        <GestureHandlerRootView className="flex-1">
        <Stack>
            <Stack.Screen name="(home)" options={{headerShown:false}} />
            <Stack.Screen name="(app)" options={{headerShown:false}} />
        </Stack>
        </GestureHandlerRootView>
    );
}