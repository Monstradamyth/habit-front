import { navigationNavigate } from "@/app/navigation/instance";
import { CoursesList } from "@/entities/course/view/CoursesList";
import { CourseType } from "@/entities/course/view/types";
import { CreateCourseModal } from "@/screens/course/components/CreateCourseModal";
import { editHabit } from "@/shared/api/habit/edit-habit";
import { getHabit } from "@/shared/api/habit/get-habit";
import { Colors, Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { isTextFieldValid } from "@/shared/config/validation";
import { BackButton } from "@/shared/ui/BackButton";
import { Card } from "@/shared/ui/card/Card";
import { Input } from "@/shared/ui/input/Input";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import { Toasts } from "@/shared/ui/toast/instance";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Dimensions,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { deleteHabit } from "@/shared/api/habit/delete-habit";
import { DeleteHabitModal } from "@/screens/habit/components/DeleteHabitModal";
import { mapStatuses } from "@/entities/habit/lib";
import { ButtonWithGradient } from "@/shared/ui/button/ButtonWithGradient";

const { height, width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useHabit = (id: string) => {
  const query = useQuery({
    queryFn: () => getHabit(id),
    enabled: !!id,
    queryKey: ["habit", id],
  });

  return query;
};

const useEditHabit = ({
  habitId,
  title,
  description,
}: {
  habitId: string;
  title: string;
  description: string;
}) => {
  const mutation = useMutation({
    mutationFn: () => editHabit(habitId, title, description),
    onSuccess: () => {
      Toasts.methods.addSuccessToast("You have successfully updated a habit!");
      navigationNavigate("Root", { screen: "Home" });
    },
  });
  return mutation;
};

const useDeleteHabit = ({ habitId }: { habitId: string }) => {
  const mutation = useMutation({
    mutationFn: () => deleteHabit(habitId),
    onSuccess: () => {
      Toasts.methods.addSuccessToast("You have successfully deleted a habit!");
      navigationNavigate("Root", { screen: "Home" });
    },
  });
  return mutation;
};

export const EditHabitScreen = ({ route }) => {
  const [habitId, setHabitId] = useState<string>("" || route.params.habitId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showDeleteHabitModal, setShowDeleteHabitModal] = useState(false);

  const { isLoading, data, refetch } = useHabit(route.params.habitId);
  const editHabit = useEditHabit({ habitId, title, description }).mutate;
  const deleteHabit = useDeleteHabit({ habitId }).mutate;

  useEffect(() => {
    if (data) {
      setHabitId(data.habit.id);
      setTitle(data.habit.title);
      setDescription(data.habit.description);
      setStatus(data.habit.status);
      setCourses(data.habit.courses);
    }
  }, [data]);

  const correctStatusStyles = (status: boolean) => {
    if (status) {
      return styles.ActiveStatusText;
    } else return styles.InactiveStatusText;
  };

  return (
    <View style={styles.BigLayout}>
      <LoaderWrapper loading={isLoading}>
        <CommonLayout>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.ScrollViewContentContainer}
              style={styles.ScrollView}
              refreshControl={
                <RefreshControl
                  tintColor="transparent"
                  colors={["transparent"]}
                  style={{ backgroundColor: "transparent" }}
                  refreshing={false}
                  onRefresh={() => console.log("refreshing")}
                />
              }
            >
              <Card style={styles.Content}>
                <BackButton />
                <Pressable
                  style={styles.TrashIcon}
                  hitSlop={{ top: 35, bottom: 35, left: 35, right: 35 }}
                  onPress={() => setShowDeleteHabitModal(true)}
                >
                  <Icon color={Colors.red} name="trash-can-outline" size={32} />
                </Pressable>
                <Text style={styles.Title}>Edit habit</Text>
                <Text style={[styles.Status, correctStatusStyles(status)]}>
                  {mapStatuses(status)}
                </Text>
                <View style={styles.InputsContainer}>
                  <Text>{}</Text>
                  <Input
                    label="Title"
                    value={title}
                    onChange={(text) => setTitle(text)}
                    errorText="Title length is too short!"
                    hasError={!isTextFieldValid(title)}
                    style={styles.Input}
                  />
                  <Input
                    label="Description"
                    value={description}
                    onChange={(text) => setDescription(text)}
                    errorText="Description length is too short!"
                    hasError={!isTextFieldValid(description)}
                    style={styles.Input}
                  />
                </View>
                <View style={styles.ListWrapper}>
                  <View style={styles.ListButtonsWrapper}>
                    <Text style={styles.ListTitle}>Courses List</Text>
                    <Button
                      onPress={() => setShowAddCourseModal(true)}
                      style={{ alignSelf: "center" }}
                      mode="outlined"
                    >
                      Create
                    </Button>
                  </View>
                  <CoursesList
                    courses={courses}
                    onSelect={(item) =>
                      navigationNavigate("EditCourse", { courseId: item.id })
                    }
                  />
                </View>
              </Card>
            </ScrollView>
          </TouchableWithoutFeedback>
        </CommonLayout>
        <ButtonWithGradient text="Save" onPress={() => editHabit()} />
        <CreateCourseModal
          habitId={habitId}
          isVisible={showAddCourseModal}
          onDismiss={() => setShowAddCourseModal(false)}
          onSubmit={() => {
            setShowAddCourseModal(false);
            refetch();
          }}
        />
        <DeleteHabitModal
          isVisible={showDeleteHabitModal}
          onDismiss={() => setShowDeleteHabitModal(false)}
          onSubmit={(val) => {
            deleteHabit();
            setShowDeleteHabitModal(false);
          }}
        />
      </LoaderWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  BigLayout: {
    flex: 1,
  },
  ScrollViewContentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: Offset.paddingHorizontal,
  },
  ScrollView: {
    height: height - statusBarHeight - TOP_HEIGHT - 30,
  },
  Content: {
    flex: 1,
    backgroundColor: "pink",
  },
  Title: {
    fontSize: 42,
    textAlign: "center",
  },
  Status: {
    textTransform: "capitalize",
    textAlign: "center",
    fontSize: 22,
  },
  ActiveStatusText: {
    color: Colors.activeColor,
  },
  InactiveStatusText: {
    color: Colors.inactiveColor,
  },
  InputsContainer: {
    justifyContent: "center",
    flex: 1,
  },
  Input: {
    marginTop: 20,
  },
  ListWrapper: {
    flex: 1,
    paddingBottom: 60,
  },
  ListButtonsWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ListTitle: {
    fontSize: 26,
    marginBottom: -20,
  },
  TrashIcon: {
    position: "absolute",
    right: 0,
    top: 15,
    zIndex: 1,
  },
});
