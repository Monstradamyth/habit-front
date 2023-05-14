import { navigationNavigate, replaceNavigationStateAndGoToScreen } from "@/app/navigation/instance";
import { clientToken } from "@/app/token/token";
import { signIn } from "@/shared/api/auth/signIn";
import { Colors, Offset } from "@/shared/config/constants";
import { isEmailValid } from "@/shared/config/validation";
import { Input } from "@/shared/ui/input/Input";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import { Toasts } from "@/shared/ui/toast/instance";
import React from "react";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useMutation } from "react-query";

const useSignIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const mutation = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: (data) => {
      clientToken.setToken(data.token);
      Toasts.methods.addSuccessToast("You have successfully signed in!");
      replaceNavigationStateAndGoToScreen("Root")
    },
  });

  return mutation;
};

export const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useSignIn({ email, password });


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <CommonLayout>
        <LoaderWrapper loading={isLoading}>
          <View style={styles.Container}>
            <View style={styles.Card}>
              <Text style={styles.Title}>Log in</Text>
              <View style={styles.InputsContainer}>
                <Input
                  label="Email"
                  value={email}
                  errorText="Email is invalid!"
                  keyboardType="email-address"
                  hasError={!isEmailValid(email)}
                  onChange={(text) => setEmail(text)}
                  style={styles.Input}
                />
                <Input
                  label="Password"
                  value={password}
                  secureTextEntry={true}
                  errorText="Password is invalid!"
                  hasError={password.length < 6}
                  onChange={(text) => setPassword(text)}
                  style={styles.Input}
                />
                <Text
                  style={styles.SignUpText}
                  onPress={() => navigationNavigate("Root", { screen: "SignUp" })}
                >
                  Don`t have an account? Sign up!
                </Text>
              </View>
              <View style={styles.ButtonWrapper}>
                <Button mode="contained-tonal" onPress={() => mutate()}>
                  Send
                </Button>
              </View>
            </View>
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
  SignUpText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    opacity: 0.5,
  },
  ButtonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
