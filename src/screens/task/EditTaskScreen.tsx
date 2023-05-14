import { navigationNavigate } from "@/app/navigation/instance";
import { AttemptsList } from "@/entities/attempt/view/AttemptsList";
import { useTaskModel } from "@/screens/task/model/task.model";
import { getTask } from "@/shared/api/task/get-task";
import { Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { isTextFieldValid } from "@/shared/config/validation";
import { BackButton } from "@/shared/ui/BackButton";
import { ButtonWithGradient } from "@/shared/ui/button/ButtonWithGradient";
import { Card } from "@/shared/ui/card/Card";
import { Input } from "@/shared/ui/input/Input";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import Constants from "expo-constants";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";

const { height, width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useTask = (id: string) => {
  const query = useQuery({
    queryFn: () => getTask(id),
    enabled: !!id,
    queryKey: ["task", id],
  });

  return query;
};

export const EditTaskScreen = ({ route }) => {
  const {
    title,
    description,
    attempts,
    setTitle,
    setDescription,
    setAttempts,
    reset,
    canSubmit,
  } = useTaskModel((state) => ({
    title: state.title,
    description: state.description,
    attempts: state.attempts,
    setTitle: state.setTitle,
    setDescription: state.setDescription,
    setAttempts: state.setAttempts,
    reset: state.reset,
    canSubmit: state.canSubmit,
  }));

  const { data, isLoading, refetch } = useTask(route.params.taskId);

  useEffect(() => {
    if (data) {
      setTitle(data.task.title);
      setDescription(data.task.description)
      setAttempts(data.task.attempts);
    }
    return () => reset();
  }, [data]);

  return (
    <View style={styles.BigLayout}>
      <CommonLayout>
        <LoaderWrapper loading={isLoading}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                tintColor="transparent"
                colors={["transparent"]}
                style={{ backgroundColor: "transparent" }}
                refreshing={false}
                onRefresh={() => refetch()}
              />
            }
            contentContainerStyle={styles.ScrollViewContentContainer}
            style={styles.ScrollView}
          >
            <Card style={styles.Content}>
              <BackButton />
              <Text style={styles.Title}>Edit task</Text>
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
            </Card>
          </ScrollView>
        </TouchableWithoutFeedback>
        </LoaderWrapper>
      </CommonLayout>
      <View style={styles.ListWrapper}>
        <View style={styles.ListButtonsWrapper}>
          <Text style={styles.ListTitle}>Attempts List</Text>
        </View>
        <AttemptsList
          attempts={attempts}
          onSelect={(item) =>
            navigationNavigate("EditAttempt", { taskId: item.id })
          }
        />
      </View>

      <ButtonWithGradient text="Save" onPress={() => console.log('save')} />
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
  Input: {
    marginBottom: 10,
  },
  ListWrapper: {
    flex: 1,
    paddingBottom: 60,
  },
  ListButtonsWrapper: {
    paddingHorizontal: Offset.paddingHorizontal,
  },
  ListTitle: {
    fontSize: 26,
    marginBottom: -20,
  },
});
