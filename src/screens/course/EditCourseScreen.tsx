import { Colors, Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import {
  Dimensions,
  Keyboard,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";
import { Card } from "@/shared/ui/card/Card";
import { BackButton } from "@/shared/ui/BackButton";
import { Button, Text } from "react-native-paper";
import { Input } from "@/shared/ui/input/Input";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  isNumericFieldValid,
  isTextFieldValid,
} from "@/shared/config/validation";
import { useCourseModal } from "@/screens/course/model/course.model";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TasksList } from "@/entities/task/view/TasksList";
import { CreateTaskModal } from "@/screens/task/components/CreateTaskModal";
import { navigationNavigate } from "@/app/navigation/instance";
import { Toasts } from "@/shared/ui/toast/instance";
import { useMutation, useQuery } from "react-query";
import { getCourse } from "@/shared/api/course/get-course";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import { startCourse } from "@/shared/api/course/start-course";
import { correctStatusStyles } from "@/entities/course/lib";
import { queryClient } from "@/shared/react-query/query-client";
import { ButtonWithGradient } from "@/shared/ui/button/ButtonWithGradient";

const { height } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useCourse = (id: string) => {
  const query = useQuery({
    queryFn: () => getCourse(id),
    enabled: !!id,
    queryKey: ["course", id],
  });

  return query;
};

const useStartCourse = (id: string) => {
  const mutation = useMutation({
    mutationFn: () => startCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries("habit");
    },
  });

  return mutation;
};

export const EditCourseScreen = ({ route }) => {
  const {
    title,
    endDate,
    taskFrequency,
    successPercentage,
    showCalendarForEnd,
    status,
    tasks,
    setTitle,
    setEndDate,
    setTaskFrequency,
    setSuccessPercentage,
    setShowCalendarForEnd,
    setStatus,
    setTasks,
    reset,
  } = useCourseModal((state) => state);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const { isLoading, data, refetch } = useCourse(route.params.courseId);
  const { mutate, isSuccess } = useStartCourse(route.params.courseId);
  const isLoadingForStart = useStartCourse(route.params.courseId).isLoading;

  useEffect(() => {
    if (data) {
      setEndDate(dayjs(data.course.endDate));
      setTaskFrequency(data.course.taskFrequency);
      setSuccessPercentage(data.course.successPercentage);
      setTasks(data.course.tasks);
      setStatus(data.course.status);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      Toasts.methods.addSuccessToast("You have successfully started a course!");
      refetch();
    }
  }, [isSuccess]);

  return (
    <View style={styles.BigLayout}>
      <CommonLayout>
        <LoaderWrapper loading={isLoading || isLoadingForStart}>
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
                  onRefresh={() => refetch()}
                />
              }
            >
              <Card style={styles.Content}>
                <BackButton />
                <Text style={styles.Title}>Your course</Text>
                <Text style={[styles.Status, correctStatusStyles(status)]}>
                  {status}
                </Text>
                <Input
                  disabled
                  label="Title"
                  value={title}
                  onChange={(text) => setTitle(text)}
                  errorText="Title length is too short!"
                  hasError={!isTextFieldValid(title)}
                  style={styles.Input}
                />
                <Pressable
                  style={styles.DateContent}
                  onPress={() => setShowCalendarForEnd(true)}
                >
                  <Text style={styles.DatePlaceholder}>End Date</Text>
                  <Text>{endDate.format("DD.MM.YY")}</Text>
                </Pressable>
                {showCalendarForEnd && (
                  <RNDateTimePicker
                    disabled
                    value={endDate.toDate()}
                    minimumDate={dayjs().toDate()}
                    onChange={(val) => {
                      setEndDate(dayjs(val.nativeEvent.timestamp));
                      setShowCalendarForEnd(false);
                    }}
                  />
                )}
                <Input
                  disabled
                  label="Task Frequency"
                  value={taskFrequency?.toString() || ""}
                  onChange={(text) => setTaskFrequency(text)}
                  errorText="Task Frequency is invalid!"
                  hasError={!isNumericFieldValid(taskFrequency, 100)}
                  keyboardType="numeric"
                  style={styles.Input}
                />
                <Input
                  disabled
                  label="Success Percentage"
                  value={successPercentage?.toString() || ""}
                  onChange={(text) => setSuccessPercentage(text)}
                  errorText="Success Percentage is invalid!"
                  hasError={!isNumericFieldValid(successPercentage, 100)}
                  infoText="*Percent of successfully finished tasks for a course to be considered as finished."
                  keyboardType="numeric"
                  style={styles.Input}
                />
                <View style={styles.ListWrapper}>
                  <View style={styles.ListButtonsWrapper}>
                    <Text style={styles.ListTitle}>Tasks List</Text>
                    <Button
                      onPress={() => setShowAddTaskModal(true)}
                      style={{ alignSelf: "center" }}
                      mode="outlined"
                    >
                      Create
                    </Button>
                  </View>
                  <TasksList
                    tasks={tasks}
                    onSelect={(item) =>
                      navigationNavigate("EditTask", { taskId: item.id })
                    }
                  />
                </View>
              </Card>
            </ScrollView>
          </TouchableWithoutFeedback>
        </LoaderWrapper>
      </CommonLayout>
      <ButtonWithGradient
        text={status.toLowerCase() === "active" ? "Fail" : "Start"}
        onPress={() => {
          if (status.toLowerCase() === "active") {
            console.log("fail");
          } else {
            mutate();
          }
        }}
      />
      <CreateTaskModal
        courseId={route.params.courseId}
        isVisible={showAddTaskModal}
        onDismiss={() => setShowAddTaskModal(false)}
        onSubmit={() => {
          setShowAddTaskModal(false);
          refetch();
        }}
      />
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
    marginBottom: 10,
  },
  DateContent: {
    height: 56,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 14,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    marginBottom: 20,
  },
  DatePlaceholder: {
    fontSize: 12,
    position: "absolute",
    top: 5,
    left: 10,
    opacity: 0.5,
  },
  Input: {
    marginBottom: 10,
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
});
