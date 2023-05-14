import { Colors } from "@/shared/config/constants";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const BackButton = ({ style, onPress }: BackButtonProps) => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      style={[styles.BackWrapper, style]}
      onPress={onPress || goBackHandler}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Icon name="arrow-left" color={Colors.accentColor} size={30} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  BackWrapper: {
    position: "absolute",
    top: 6,
    width: 30,
    height: 30,
    paddingTop: 6,
    paddingLeft: 5,
    zIndex: 2,
  },
});
