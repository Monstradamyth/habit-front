import { Colors, Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import {
  Dimensions,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";
import { LoaderWrapper } from "@/shared/ui/loader/LoaderWrapper";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { SettingsForm } from "@/screens/settings/components/SettingsForm";
import { DeleteAccountModal } from "@/screens/settings/components/DeleteAccountModal";
import { useSettingsStore } from "@/screens/settings/model/settings-screen.model";
import { clientToken } from "@/app/token/token";
import { navigationNavigate } from "@/app/navigation/instance";
import { useImagePickerStore } from "@/shared/ui/image-picker/model/image-picker.model";
import { PermissionsModal } from "@/screens/settings/components/PermissionsModal";
import { useQuery } from "react-query";
import { getUser } from "@/shared/api/user/get-user";

const { height } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useUser = () => {
  const query = useQuery({
    queryFn: () => getUser(),
  });

  return query;
};

export const SettingsScreen = () => {
  const { canSubmit } = useSettingsStore((state) => ({
    canSubmit: state.canSubmit,
  }));
  const { pending, showOpenSettingModal, setShowOpenSettingsModal } =
    useImagePickerStore((state) => ({
      pending: state.pending,
      showOpenSettingModal: state.showOpenSettingModal,
      setShowOpenSettingsModal: state.setShowOpenSettingModal,
    }));
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const { data, isLoading } = useUser();

  useEffect(() => {
    if (data) {
      useSettingsStore.setState({
        name: data.name,
        email: data.email,
      });
      useImagePickerStore.setState({
        thumbnail: data.avatar,
      });
    }
  }, [data]);

  const logout = async () => {
    await clientToken.setToken(null);
    navigationNavigate("Authorization", { screen: "LogIn" });
  };
  return (
    <CommonLayout>
      <TouchableWithoutFeedback
        style={styles.Wrapper}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
              refreshing={false}
              onRefresh={() => console.log("refreshing")}
            />
          }
          contentContainerStyle={styles.ScrollViewContentContainer}
          style={styles.ScrollView}
        >
          <LoaderWrapper loading={pending || isLoading}>
            <SettingsForm />
          </LoaderWrapper>
          <View style={styles.ButtonsWrapper}>
            <Text style={styles.LogoutText} onPress={() => logout()}>
              Log Out
            </Text>

            <Text
              style={styles.DeleteText}
              onPress={() => setShowDeleteAccountModal(true)}
            >
              Delete account
            </Text>
            <Button
              mode="contained"
              disabled={!canSubmit()}
              onPress={async () => {
                console.log("submitting");
              }}
            >
              Save
            </Button>
          </View>
          <DeleteAccountModal
            isVisible={showDeleteAccountModal}
            onDismiss={() => setShowDeleteAccountModal(false)}
            onSubmit={() => {
              setShowDeleteAccountModal(false);
              console.log("deleting account");
            }}
          />
          <PermissionsModal
            isVisible={showOpenSettingModal}
            onDismiss={() => setShowOpenSettingsModal(false)}
            onSubmit={() => {
              setShowOpenSettingsModal(false);
            }}
          />
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
  LogoutText: {
    alignSelf: "center",
    marginBottom: 20,
    color: Colors.accentColor,
  },
  DeleteText: {
    color: Colors.red,
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "500",
  },
  ButtonsWrapper: {
    paddingBottom: 15,
  },
});
