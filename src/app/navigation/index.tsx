import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthorizationStackParamList, HabitStackParamList, RootStackParamList, RootTabParamList } from "@/app/navigation/types";
import { HomeScreen } from "@/screens/home/HomeScreen";
import { SettingsScreen } from "@/screens/settings/SettingsScreen";
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogInScreen } from "@/screens/authorization/LoginScreen";
import { SignUpScreen } from "@/screens/authorization/SignUpScreen";
import { CreateHabitScreen } from "@/screens/habit/CreateHabitScreen";
import { EditHabitScreen } from "@/screens/habit/EditHabitScreen";
import { EditCourseScreen } from "@/screens/course/EditCourseScreen";
import { EditTaskScreen } from "@/screens/task/EditTaskScreen";
import { LoaderScreen } from "@/screens/loader/LoaderScreen";
import { clientToken } from "@/app/token/token";
import { navigationNavigate, navigationRef } from "@/app/navigation/instance";

export function Navigation() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff'

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      children={<RootNavigator />}
      onReady={async () => {
        const isLoggedIn = await clientToken.getToken();

        if (isLoggedIn) {
          navigationNavigate('Root', { screen: 'Home' })
        } else {
          navigationNavigate('Authorization', { screen: 'LogIn' })
        }
      }}
      />
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Loader" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authorization" component={AuthorizationNavigator} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Habit" component={HabitNavigator} />
      <Stack.Screen name="EditCourse" component={EditCourseScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen name="Loader" component={LoaderScreen} />
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const Authorization = createNativeStackNavigator<AuthorizationStackParamList>();

function AuthorizationNavigator() {
  return (
    <Authorization.Navigator screenOptions={{ headerShown: false }}>
      <Authorization.Screen name="LogIn" component={LogInScreen} />
      <Authorization.Screen
        name="SignUp"
        component={SignUpScreen}
      />
    </Authorization.Navigator>
  );
}

const Habit = createNativeStackNavigator<HabitStackParamList>();

function HabitNavigator() {
  return (
    <Habit.Navigator screenOptions={{ headerShown: false }}>
      <Habit.Screen name="CreateHabit" component={CreateHabitScreen} />
      <Habit.Screen name="EditHabit" component={EditHabitScreen} />
    </Habit.Navigator>
  );
}