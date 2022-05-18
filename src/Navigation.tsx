import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from './hooks/AuthProvider';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Screens
import SignIn from './screens/auth/SignIn';
import Home from './screens/Home';
import Settings from './screens/Settings';

// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {focused: boolean; color: string}) => (
  <Icon name="home-variant-outline" size={20} color={color} />
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
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: homeIcon,
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
