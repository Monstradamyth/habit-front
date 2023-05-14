import { navigationNavigate } from "@/app/navigation/instance";
import { signUp } from "@/shared/api/auth/signUp";
import { Colors, Offset } from "@/shared/config/constants";
import { BackButton } from "@/shared/ui/BackButton";
import { Card } from "@/shared/ui/card/Card";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import { Toasts } from "@/shared/ui/toast/instance";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useMutation } from "react-query";

const useSignUp = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {

  const mutation = useMutation({
    mutationFn: () => signUp(name, email, password),
    onSuccess: (data) => {
      Toasts.methods.addSuccessToast("You have successfully signed up!")
    },
  });

  return mutation;
};

export const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutate, isSuccess, isLoading } = useSignUp({ email, password, name });

  useEffect(() => {
    if (isSuccess) {
      navigationNavigate("Root", { screen: "LogIn" });
    }
  }, [isSuccess]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <CommonLayout>
        <LoaderWrapper loading={isLoading}>
          <View style={styles.Container}>
            <Card style={styles.Card}>
              <BackButton />
              <Text style={styles.Title}>Sign Up</Text>
              <View style={styles.InputsContainer}>
                <TextInput
                  label="Name"
                  value={name}
                  onChange={(text) => setName(text.nativeEvent.text)}
                  style={styles.Input}
                />
                <TextInput
                  label="Email"
                  value={email}
                  onChange={(text) => setEmail(text.nativeEvent.text)}
                  style={styles.Input}
                />
                <TextInput
                  label="Password"
                  value={password}
                  secureTextEntry={true}
                  onChange={(text) => setPassword(text.nativeEvent.text)}
                  style={styles.Input}
                />
              </View>
              <View style={styles.ButtonWrapper}>
                <Button mode="contained-tonal" onPress={() => mutate()}>
                  Send
                </Button>
              </View>
            </Card>
          </View>
        </LoaderWrapper>
      </CommonLayout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: Offset.paddingHorizontal,
    paddingVertical: 20,
    flex: 1,
  },
  Card: {
    borderRadius: 10,
    backgroundColor: Colors.mainColor,
    flex: 1,
    justifyContent: "flex-end",
  },
  Title: {
    fontSize: 42,
    textAlign: "center",
  },
  InputsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  Input: {
    marginTop: 20,
  },
  ButtonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
