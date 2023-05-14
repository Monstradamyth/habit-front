import { navigationNavigate } from "@/app/navigation/instance";
import { createHabit } from "@/shared/api/habit/create-habit";
import { Colors, Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { isTextFieldValid } from "@/shared/config/validation";
import { queryClient } from "@/shared/react-query/query-client";
import { BackButton } from "@/shared/ui/BackButton";
import { Card } from "@/shared/ui/card/Card";
import { Input } from "@/shared/ui/input/Input";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import { Loader } from "@/shared/ui/loader/Loader";
import { Toasts } from "@/shared/ui/toast/instance";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Dimensions,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useMutation } from "react-query";

const { height } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useCreateHabit = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const mutation = useMutation({
    mutationFn: () => createHabit(title, description),
    onSuccess: () => {
      Toasts.methods.addSuccessToast("You have successfully created a habit!");
      queryClient.invalidateQueries("habits");
      navigationNavigate("Root", { screen: "Home" });
    },
  });

  return mutation;
};

export const CreateHabitScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const { mutate, isLoading } = useCreateHabit({ title, description });

  return (
    <CommonLayout>
      <TouchableWithoutFeedback
        style={styles.Wrapper}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.ScrollViewContentContainer}
          style={styles.ScrollView}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Card style={styles.Content}>
                <BackButton />
                <Text style={styles.Title}>Create a habit</Text>
                <View style={styles.InputsContainer}>
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
              </Card>
              <Button
                style={styles.AddCourse}
                mode="outlined"
                hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                disabled={
                  !isTextFieldValid(title) && !isTextFieldValid(description)
                }
                onPress={() => mutate()}
              >
                Save
              </Button>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
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
    backgroundColor: "pink",
  },
  Title: {
    fontSize: 42,
    textAlign: "center",
  },
  InputsContainer: {
    justifyContent: "center",
  },
  Input: {
    marginTop: 20,
  },
  AddCourse: {
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    borderRadius: 10,
  },
});
