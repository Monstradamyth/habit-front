import { TaskType } from "@/entities/task/view/types";
import { Colors } from "@/shared/config/constants";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type TaskListElementProps = {
  item: TaskType;
  onPress: Function;
}

export const TaskListElement = (props: TaskListElementProps) => {
  return (
    <Pressable onPress={() => props.onPress(props.item)}>
      <View style={styles.Content}>
        <Text style={styles.Title}>{props.item.title}</Text>
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
