import { useTaskModel } from "@/screens/task/model/task.model";
import { createTask } from "@/shared/api/task/create-task";
import { isTextFieldValid } from "@/shared/config/validation";
import { Input } from "@/shared/ui/input/Input";
import { Loader } from "@/shared/ui/loader/Loader";
import { Modal } from "@/shared/ui/modal/Modal";
import { Toasts } from "@/shared/ui/toast/instance";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation } from "react-query";

type CreateTaskModalProps = {
  courseId: string;
  isVisible: boolean;
  onDismiss: Function;
  onSubmit: Function;
};

const useCreateTask = ({
  courseId,
  title,
  description,
}: {
  courseId: string;
  title: string;
  description: string;
}) => {
  const mutation = useMutation({
    mutationFn: () => createTask({ courseId, title, description }),
  });

  return mutation;
};

export const CreateTaskModal = (props: CreateTaskModalProps) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    reset,
    canSubmit,
  } = useTaskModel((state) => state);

  const { mutate, isLoading, isSuccess, isError } = useCreateTask({
    courseId: props.courseId,
    title,
    description,
  });

  useEffect(() => {
    if (isSuccess) {
      Toasts.methods.addSuccessToast("You have successfully created a task!");
      reset();
      props.onSubmit();
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      reset();
      props.onDismiss();
    }
  }, [isError])

  return (
    <Modal
      isVisible={props.isVisible}
      onDismiss={() => {
        reset();
        props.onDismiss();
      }}
    >
      <View style={styles.Content}>
        <Text style={styles.Title}>Create a Task</Text>
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
          errorText="Title length is too short!"
          hasError={!isTextFieldValid(description)}
          style={styles.Input}
        />
        <Button
          mode="contained"
          disabled={isLoading || !canSubmit()}
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
  Input: {
    marginBottom: 10,
  },
});
