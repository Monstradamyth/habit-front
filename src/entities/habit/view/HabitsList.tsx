import { HabitListElement } from "@/entities/habit/view/HabitListElement";
import { HabitType } from "@/entities/habit/view/types";
import { Offset } from "@/shared/config/constants";
import { EmptyList } from "@/shared/ui/empty-list/EmptyList";
import { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('window').width;

type HabitList = {
  habits: HabitType[];
  onSelect: Function;
  refreshFunction: Function;
  isRefreshing: boolean;
}

export const HabitsList = (props: HabitList) => {

  const renderItem = ({ item }: { item: HabitType }) => {
    return (
      <HabitListElement
        key={item.id}
        item={item}
        onPress={(habit) => props.onSelect(habit)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <FlatList
        data={props.habits}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        ListFooterComponent={<View style={{ height: 25 }} />}
        refreshing={props.isRefreshing}
        onRefresh={() => props.refreshFunction()}
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
    paddingHorizontal: Offset.paddingHorizontal,
  }
});
