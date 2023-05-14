import { correctStatusStyles } from "@/entities/course/lib";
import { CourseType } from "@/entities/course/view/types";
import { Colors } from "@/shared/config/constants";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type CourseListElementProps = {
  item: CourseType;
  onPress: Function;
};

export const CourseListElement = (props: CourseListElementProps) => {
  return (
    <Pressable onPress={() => props.onPress(props.item)}>
      <View style={styles.Content}>
        <Text style={styles.Title}>Course</Text>
        <Text style={[styles.Status, correctStatusStyles(props.item.status)]}>
          {props.item.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Content: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {},
  Status: {
    textTransform: "capitalize",
  },
});
