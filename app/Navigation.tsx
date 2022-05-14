import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

// Screens
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
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
