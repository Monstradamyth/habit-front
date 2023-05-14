import { makeEvent } from "@/app/state-management/make-event";
import { clientToken } from "@/app/token/token";
import { queryClient } from "@/shared/react-query/query-client";
import * as ExpoImagePicker from "expo-image-picker";
import { Linking } from 'react-native'
import { create } from "zustand";

interface IImagePickerStore {
  thumbnail: string | null;
  isLimitedAccess: boolean;
  showOpenSettingModal: boolean;
  pending: boolean;
  setPending: (pending: boolean) => void;
  setShowOpenSettingModal: (show: boolean) => void;
}
export const useImagePickerStore = create<IImagePickerStore>((set) => ({
  thumbnail: null,
  isLimitedAccess: false,
  showOpenSettingModal: false,
  pending: false,
  setPending: (pending: boolean) => set({ pending: pending }),
  setShowOpenSettingModal: (show: boolean) => set({ showOpenSettingModal: show }),
}))

export const imagePickerFactory = () => {
  const imageWasUploaded = makeEvent();

  const openSystemSettings = async () => {
    Linking.openSettings();
  };

  const hasMediaLibraryPermissionGranted = async () => {
    let granted = false;
    const permission =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      !permission.canAskAgain ||
      permission.status === ExpoImagePicker.PermissionStatus.DENIED
    ) {
      granted = false;
    }
    if (permission.granted) {
      granted = true;
    }
    return granted;
  };

  const checkForPermission = async () => {
    const permissions = await ExpoImagePicker.getMediaLibraryPermissionsAsync();
    useImagePickerStore.setState({ isLimitedAccess: permissions.accessPrivileges === "limited" })
    return permissions;
  };

  const workWithPermissions = async () => {
    const localUri = null;
    const permission = await checkForPermission();
    if (
      permission.status === ExpoImagePicker.PermissionStatus.DENIED &&
      permission.canAskAgain === false
    ) {
      useImagePickerStore.setState({ showOpenSettingModal: true });
      return localUri;
    } else if (
      permission.status === ExpoImagePicker.PermissionStatus.UNDETERMINED ||
      (permission.status === ExpoImagePicker.PermissionStatus.DENIED &&
        permission.canAskAgain === true)
    ) {
      const storagePermissionGranted = await hasMediaLibraryPermissionGranted();
      if (!storagePermissionGranted) {
        return localUri;
      }
      return storagePermissionGranted;
    } else return true;
  };

  const handleImagePick = async () => {
    const res = await workWithPermissions();
    if (res) {
      getImage();
    }
  };

  const getImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return;
    }

    const resultUri = `${result.assets[0].uri}`;

    let filename = resultUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename || "");
    let type = match ? `image/${match[1]}` : "image";

    const data = new FormData();

    data.append('avatar', {
      uri: resultUri,
      name: resultUri.split("/").pop(),
      type: type,
    } as any);
    useImagePickerStore.setState({ thumbnail: resultUri });

    uploadImage(data);
  };

  const uploadImage = async (file: FormData) => {
    try {
      useImagePickerStore.setState({ pending: true });
      const jwt = await clientToken.getToken();

      let res = await fetch('http://192.168.1.10:3000/users/me/avatar', {
        method: 'patch',
        body: file,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${jwt}`
        },
      });

      if (res.ok) {
        queryClient.invalidateQueries('user');
      }

      let result = await res.json();

      imageWasUploaded.emit();
    } catch (e) {
    } finally {
      useImagePickerStore.setState({ pending: false });
    }
  };

  const deleteImage = () => {
    useImagePickerStore.setState({ thumbnail: null });
    imageWasUploaded.emit();
  };

  return {
    events: {
      handleImagePick,
      openSystemSettings,
    },
  };
};

export type ImagePicker = ReturnType<typeof imagePickerFactory>;
export const imagePicker = imagePickerFactory();
