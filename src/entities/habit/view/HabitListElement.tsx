import { mapStatuses } from "@/entities/habit/lib";
import { HabitType } from "@/entities/habit/view/types";
import { Colors } from "@/shared/config/constants";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type HabitListElementProps = {
  item: HabitType;
  onPress: Function;
}

export const HabitListElement = (props: HabitListElementProps) => {
  const correctStatusStyles = (status: boolean) => {
    if (status) {
      return styles.ActiveStatusText;
    } else return styles.InactiveStatusText;
  }

  return (
    <Pressable onPress={() => props.onPress(props.item)}>
      <View style={styles.Content}>
        <Text style={styles.Title}>{props.item.title}</Text>
        <Text style={correctStatusStyles(props.item.status)}>{mapStatuses(props.item.status)}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  Content: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Title: {
  },
  ActiveStatusText: {
    textTransform: "capitalize",
    color: Colors.activeColor,
  },
  InactiveStatusText: {
    textTransform: "capitalize",
    color: Colors.inactiveColor,
  }
})
