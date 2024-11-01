import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { useRouter,useSegments,useRootNavigationState } from 'expo-router';
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [logged,setLogged] = React.useState<boolean>();
  const [loading,setLoading] = React.useState(false);
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigationState();
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try{
        const isLogged = await AsyncStorage.getItem('logged');
        setLogged(isLogged=='true' ? true : false);
      }catch(e){
        console.error(e);
      }finally{
        setLoading(false);
      }
      
      const theme = await AsyncStorage.getItem('theme');
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);
  React.useEffect(() => {
    if(!rootNavigation?.key) return;
    const homeGroup = segments[0]=== '(home)';
    if(logged && !homeGroup) router.replace('/(home)')
    else if(!logged && homeGroup) router.replace('/')
  },[logged,rootNavigation]);
  if (!isColorSchemeLoaded) {
    return null;
  }
  if(loading){
    <View className='flex flex-col justify-center items-center'>
      <ActivityIndicator size='large' />
    </View>
  }
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="login" options={{headerShown:false}} />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}