import { RootStackParamList } from "@/app/navigation/types";
import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const navigationRef = createNavigationContainerRef<NativeStackNavigationProp<RootStackParamList>>();

export function navigationNavigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replaceNavigationStateAndGoToScreen(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name }],
      }),
    );
  }
}