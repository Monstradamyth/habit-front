import {
  isNumericFieldValid,
  isTextFieldValid,
} from "@/shared/config/validation";
import { Input } from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Colors } from "@/shared/config/constants";
import { useCourseModal } from "@/screens/course/model/course.model";
import { useMutation } from "react-query";
import { createCourse } from "@/shared/api/course/create-course";
import { Toasts } from "@/shared/ui/toast/instance";
import { Loader } from "@/shared/ui/loader/Loader";
import { useEffect } from "react";

type CreateCourseModalProps = {
  habitId: string;
  isVisible: boolean;
  onDismiss: Function;
  onSubmit: Function;
};

const useCreateCourse = ({
  habitId,
  title,
  endDate,
  taskFrequency,
  successPercentage,
}: {
  habitId: string;
  title: string;
  endDate: number;
  taskFrequency: number;
  successPercentage: number;
}) => {
  const mutation = useMutation({
    mutationFn: () => createCourse({ habitId, title, endDate, taskFrequency, successPercentage }),
  });

  return mutation;
};

export const CreateCourseModal = (props: CreateCourseModalProps) => {
  const {
    title,
    endDate,
    taskFrequency,
    successPercentage,
    showCalendarForEnd,
    setTitle,
    setEndDate,
    setTaskFrequency,
    setSuccessPercentage,
    setShowCalendarForEnd,
    canSubmit,
    reset,
  } = useCourseModal((state) => state);

  const { mutate, isLoading, isSuccess } = useCreateCourse({
    habitId: props.habitId,
    title,
    endDate: endDate.millisecond(),
    taskFrequency: Number(taskFrequency),
    successPercentage: Number(successPercentage),
  });

  useEffect(() => {
    if (isSuccess) {
      Toasts.methods.addSuccessToast("You have successfully created a course!");
      reset();
      props.onDismiss();
    }
  }, [isSuccess])

  return (
    <Modal
      isVisible={props.isVisible}
      onDismiss={() => {
        reset();
        props.onDismiss();
      }}
    >
      <View style={styles.Content}>
        <Text style={styles.Title}>Create a Course</Text>
        <Input
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
            value={endDate.toDate()}
            minimumDate={dayjs().toDate()}
            onChange={(val) => {
              setEndDate(dayjs(val.nativeEvent.timestamp));
              setShowCalendarForEnd(false);
            }}
          />
        )}
        <Input
          label="Task Frequency"
          value={taskFrequency?.toString() || ""}
          onChange={(text) => setTaskFrequency(text)}
          errorText="Task Frequency is invalid!"
          hasError={!isNumericFieldValid(taskFrequency, 100)}
          keyboardType="numeric"
          style={styles.Input}
        />
        <Input
          label="Success Percentage"
          value={successPercentage?.toString() || ""}
          onChange={(text) => setSuccessPercentage(text)}
          errorText="Success Percentage is invalid!"
          hasError={!isNumericFieldValid(successPercentage, 100)}
          infoText="*Percent of successfully finished tasks for a course to be considered as finished."
          keyboardType="numeric"
          style={styles.Input}
        />
        <Button
          disabled={isLoading || !canSubmit()}
          mode="contained"
          onPress={() => mutate()}
        >
          { isLoading ? <Loader /> : "Save" }
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Content: {
    paddingTop: 10,
  },
  Title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  DateContent: {
    height: 56,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 14,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
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
});
