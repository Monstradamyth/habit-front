import { TaskListElement } from "@/entities/task/view/TaskListElement";
import { TaskType } from "@/entities/task/view/types";
import { Offset } from "@/shared/config/constants";
import { EmptyList } from "@/shared/ui/empty-list/EmptyList";
import { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('window').width;

type TaskList = {
  tasks: TaskType[];
  onSelect: Function;
}

export const TasksList = (props: TaskList) => {
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }: { item: TaskType }) => {
    return (
      <TaskListElement
        key={item.id}
        item={item}
        onPress={(habit) => props.onSelect(habit)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <FlatList
        data={props.tasks}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        ListFooterComponent={<View style={{ height: 25 }} />}
        refreshing={refreshing}
        onRefresh={() => console.log("refreshing")}
        contentContainerStyle={styles.Scrollbar}
        ListEmptyComponent={EmptyList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: "center",
    flex: 1,
  },
  HabitItemStyle: {
    width: windowWidth * 0.9,
  },
  Separator: {
    height: 15,
  },
  Scrollbar: {
    // paddingHorizontal: Offset.paddingHorizontal,
  }
});
