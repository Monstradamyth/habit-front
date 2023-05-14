import { AttemptListElement } from "@/entities/attempt/view/AttemptListElement";
import { AttemptType } from "@/entities/attempt/view/types";
import { HabitListElement } from "@/entities/habit/view/HabitListElement";
import { HabitType } from "@/entities/habit/view/types";
import { TaskListElement } from "@/entities/task/view/TaskListElement";
import { TaskType } from "@/entities/task/view/types";
import { Offset } from "@/shared/config/constants";
import { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('window').width;

type AttemptsList = {
  attempts: AttemptType[];
  onSelect: Function;
}

export const AttemptsList = (props: AttemptsList) => {
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }: { item: AttemptType }) => {
    return (
      <AttemptListElement
        key={item.id}
        item={item}
        onPress={(habit) => props.onSelect(habit)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <FlatList
        data={props.attempts}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        ListFooterComponent={<View style={{ height: 25 }} />}
        refreshing={refreshing}
        onRefresh={() => console.log("refreshing")}
        contentContainerStyle={styles.Scrollbar}
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
    paddingHorizontal: Offset.paddingHorizontal,
  }
});
