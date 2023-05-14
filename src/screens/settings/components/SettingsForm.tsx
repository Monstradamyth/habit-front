import { PermissionsModal } from "@/screens/settings/components/PermissionsModal";
import { DeleteAccountModal } from "@/screens/settings/components/DeleteAccountModal";
import { ImagePicker } from "@/shared/ui/image-picker/ImagePicker";
import { imagePicker } from "@/shared/ui/image-picker/model/image-picker.model";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Input } from "@/shared/ui/input/Input";
import { isEmailValid, isTextFieldValid } from "@/shared/config/validation";
import { useSettingsStore } from "@/screens/settings/model/settings-screen.model";

export const SettingsForm = () => {
  const { name, email, password, setName, setEmail, setPassword, reset } =
    useSettingsStore((state) => state);

  const [showSettingsPermissionModal, setShowSettingsPermissionModal] =
    useState(false);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <View style={styles.Wrapper}>
      <ImagePicker
        style={styles.ImagePicker}
        onChangeImage={() => {
          imagePicker.events.handleImagePick();
        }}
      />
      <Input
        label="Name"
        value={name}
        onChange={(text) => setName(text)}
        errorText="Name length is too short!"
        hasError={!isTextFieldValid(name)}
        style={styles.Input}
      />
      <Input
        label="Email"
        value={email}
        onChange={(text) => setEmail(text)}
        errorText="Email is invalid!"
        hasError={!isEmailValid(email)}
        style={styles.Input}
      />
      <Input
        label="Password"
        value={password}
        onChange={(text) => setPassword(text)}
        errorText="Password length is too short!"
        hasError={!isTextFieldValid(password)}
        style={styles.Input}
      />
      {showSettingsPermissionModal && (
        <PermissionsModal
          isVisible={showSettingsPermissionModal}
          onDismiss={() => setShowSettingsPermissionModal(false)}
          onSubmit={() => {
            setShowSettingsPermissionModal(false);
            imagePicker.events.openSystemSettings();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ContentContainerStyle: {
    backgroundColor: "e5e5e5",
  },
  Wrapper: {
    marginTop: 30,
  },
  Input: {
    marginBottom: 10,
  },
  ImagePicker: {
    marginBottom: 30,
  },
  ModalText: {
    textAlign: "center",
    marginBottom: 20,
  },
});
