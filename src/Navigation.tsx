import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from './hooks/AuthProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screens
import SignIn from './screens/auth/SignIn';
import Home from './screens/Home';
import Add from './screens/Add';
import Gallery from './screens/Gallery';
import Settings from './screens/Settings';

// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {focused: boolean; color: string}) => (
  <Icon name="home-variant-outline" size={20} color={color} />
);
const addIcon = ({color}: {focused: boolean; color: string}) => (
  <Icon name="account-plus-outline" size={20} color={color} />
);
const galleryIcon = ({color}: {focused: boolean; color: string}) => (
  <Icon name="view-gallery-outline" size={20} color={color} />
);
const settingsIcon = ({color}: {focused: boolean; color: string}) => (
  <Icon name="account-settings-outline" size={20} color={color} />
);

export default function Navigation() {
  const {user} = useAuth();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!user.access_token ? (
          <OutsideStack />
        ) : (
          <Tab.Navigator barStyle={{backgroundColor: '#f2f0e0'}}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: homeIcon,
              }}
            />
            <Tab.Screen
              name="Add"
              component={Add}
              options={{
                tabBarIcon: addIcon,
              }}
            />
            <Tab.Screen
              name="Gallery"
              component={Gallery}
              options={{
                tabBarIcon: galleryIcon,
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: settingsIcon,
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function OutsideStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
