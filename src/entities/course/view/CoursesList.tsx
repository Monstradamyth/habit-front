import { CourseListElement } from "@/entities/course/view/CourseListElement";
import { CourseType } from "@/entities/course/view/types";
import { Offset } from "@/shared/config/constants";
import { EmptyList } from "@/shared/ui/empty-list/EmptyList";
import { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions, StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('window').width;

type CoursesList = {
  courses: CourseType[];
  onSelect: Function;
  style?: StyleProp<ViewStyle>
}

export const CoursesList = (props: CoursesList) => {
  const [refreshing, setRefreshing] = useState(false);


  const renderItem = ({ item }: { item: CourseType }) => {
    return (
      <CourseListElement
        key={item.id}
        item={item}
        onPress={(habit) => props.onSelect(habit)}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.Wrapper, props.style]}>
      <FlatList
        data={props.courses}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        ListFooterComponent={<View style={{ height: 25 }} />}
        refreshing={refreshing}
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
