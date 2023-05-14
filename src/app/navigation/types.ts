import {
  NavigatorScreenParams,
} from '@react-navigation/native';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Authorization: NavigatorScreenParams<AuthorizationStackParamList>;
  Habit: NavigatorScreenParams<HabitStackParamList> | undefined;
  EditCourse: { courseId: string };
  EditTask: { taskId: string };
  Loader: undefined;
}

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
}

export type AuthorizationStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
}

export type HabitStackParamList = {
  CreateHabit: undefined;
  EditHabit: { habitId: string };
}