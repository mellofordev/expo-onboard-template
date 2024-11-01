import { SafeAreaView } from "react-native-safe-area-context";
import {View,Image} from 'react-native';
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
export default function Index(){
    const router = useRouter();
    return(
        <>
      <StatusBar style="auto" />
      <Image
        className="h-1/2 w-full"
        source={{
          uri: "https://img.freepik.com/free-vector/hand-drawn-botanical-garden-illustration_23-2150176599.jpg?t=st=1729516288~exp=1729519888~hmac=e393aa21b12d3cdca2e6dc0422239c3c14cd07f8b4f79f3ecfcf8befd2001a58&w=1380",
        }}
      />
      <SafeAreaView>
        <View
          className={`flex flex-col items-center h-full container mx-auto px-3 gap-3`}
        >
          <Text className="text-5xl font-bold" style={{fontFamily:'InstrumentSerif-Italic'}}>onboarding screen</Text>
          <View className="flex flex-col justify-center items-center w-full gap-4">
            <Button className="w-full rounded-none" onPress={()=>router.replace('/login')}>
              <Text className="font-bold">Get started</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
    );
}