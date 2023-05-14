import { navigationNavigate } from "@/app/navigation/instance";
import { Offset } from "@/shared/config/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";


const { width } = Dimensions.get("window");

type ButtonProps = {
  onPress: () => void;
  text: string;
}

export const ButtonWithGradient = (props: ButtonProps) => {
  return (
    <LinearGradient
    start={{ x: 1, y: 1 }}
    end={{ x: 1, y: 0 }}
    colors={["#ffffff", "rgba(255, 255, 255, 0.5)"]}
    style={styles.ButtonWrapper}
  >
    <Button
      style={{ width: "100%" }}
      mode="contained"
      onPress={() => props.onPress()}
    >
      {props.text}
    </Button>
  </LinearGradient>
  )
}

const styles = StyleSheet.create({
  ButtonWrapper: {
    position: "absolute",
    bottom: 0,
    width: width,
    padding: Offset.paddingHorizontal,
    alignItems: "center",
    justifyContent: "center",
  },
})