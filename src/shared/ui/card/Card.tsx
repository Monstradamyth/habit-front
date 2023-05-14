import { Colors } from "@/shared/config/constants";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = (props: CardProps) => {
  return (
    <View style={[styles.Card, props.style]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.mainColor,
  }
});