import * as Font from 'expo-font';
import { View } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import RegistrationScreen from './Screens/RegistrationScreen';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from './Screens/MainScreen/PostsScreen';
import CreatePostScreen from './Screens/MainScreen/CreatePostsScreen';
import ProfileScreen from './Screens/MainScreen/ProfileScreen';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {/* <AuthStack.Navigator>
          <AuthStack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name='Register'
            component={RegistrationScreen}
          />
        </AuthStack.Navigator> */}

        <MainTab.Navigator>
          <MainTab.Screen
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color }) => (
                <MaterialCommunityIcons name='postage-stamp' size={size} color={color} />
              ),
            }}
            name='Posts'
            component={PostScreen}
          />
          <MainTab.Screen
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color }) => (
                <Feather name='plus-circle' size={size} color={color} />
              ),
            }}
            name='CreatePosts'
            component={CreatePostScreen}
          />
          <MainTab.Screen
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color }) => <Feather name='user' size={size} color={color} />,
            }}
            name='Profile'
            component={ProfileScreen}
          />
        </MainTab.Navigator>
      </NavigationContainer>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingBottom: 30,
//   },
//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     marginBottom: 10,
//   },
// });
