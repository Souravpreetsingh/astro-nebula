import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

import HomeScreen from '../screens/HomeScreen';
import HoroscopeScreen from '../screens/HoroscopeScreen';
import BirthChartScreen from '../screens/BirthChartScreen';
import CompatibilityScreen from '../screens/CompatibilityScreen';
import AIChatScreen from '../screens/AIChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const C = colors;
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ icon, label, focused }) {
  return (
    <View style={[ti.container, focused && ti.active]}>
      <Text style={[ti.icon, { color: focused ? C.onPrimaryContainer : C.onSurfaceVariant + '70' }]}>{icon}</Text>
      <Text style={[ti.label, { color: focused ? C.onPrimaryContainer : C.onSurfaceVariant + '70' }]}>{label}</Text>
    </View>
  );
}

const ti = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 4, paddingHorizontal: 12 },
  active: { backgroundColor: C.primaryContainer, borderRadius: 9999, paddingHorizontal: 20, paddingVertical: 6, shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 15 },
  icon: { fontSize: 22, marginBottom: 2 },
  label: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
});

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: C.surfaceContainerLow + 'cc',
          borderTopColor: 'rgba(255,255,255,0.05)',
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: C.secondaryContainer,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon icon="✦" label="Stars" focused={focused} /> }} />
      <Tab.Screen name="ChartsTab" component={BirthChartScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon icon="♄" label="Birth" focused={focused} /> }} />
      <Tab.Screen name="CompatTab" component={CompatibilityScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon icon="♡" label="Circles" focused={focused} /> }} />
      <Tab.Screen name="ChatTab" component={AIChatScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon icon="☉" label="Chat" focused={focused} /> }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon icon="☽" label="More" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
      <Stack.Screen name="BirthChart" component={BirthChartScreen} />
      <Stack.Screen name="Compatibility" component={CompatibilityScreen} />
      <Stack.Screen name="AIChat" component={AIChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
