import Constants from 'expo-constants';
import { ReactNode } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type LayoutProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBarColor?: string;
};

const width = Dimensions.get('screen').width;
const statusBarHeight = Constants.statusBarHeight;

export const CommonLayout = (props: LayoutProps) => {
  return (
    <SafeAreaView
      {...props}
      style={[
        styles.Layout,
        Platform.OS === 'android' && styles.AndroidLayout,
        { backgroundColor: props.statusBarColor },
      ]}>
      <View style={[{ flex: 1 }, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Layout: {
    width,
    flex: 1,
  },
  AndroidLayout: {
    paddingTop: statusBarHeight,
  },
});
