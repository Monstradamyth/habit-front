import { Colors } from "@/shared/config/constants";
import { useImagePickerStore } from "@/shared/ui/image-picker/model/image-picker.model";
import { Loader } from "@/shared/ui/loader/Loader";
import { useEffect, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ImagePickerProps = {
  style?: StyleProp<ViewStyle>;
  onChangeImage: Function;
};

export const ImagePicker = (props: ImagePickerProps) => {
  const [imageUri, setImageUri] = useState("");
  const { pending, thumbnail, uploadedImage } = useImagePickerStore(
    (state) => ({
      pending: state.pending,
      thumbnail: state.thumbnail,
      uploadedImage: state.thumbnail,
    })
  );

  return (
    <View style={[styles.Wrapper, props.style]}>
      <View
        style={styles.ImageWrapper}
        onTouchEnd={() => {
          props.onChangeImage();
        }}
      >
        {pending ? (
          <Loader />
        ) : (
          <>
            {uploadedImage ? (
              <Image source={{ uri: uploadedImage }} style={styles.Image} />
            ) : (
              <Icon
                name="camera-plus-outline"
                color={Colors.accentColor}
                size={30}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    alignSelf: "center",
  },
  ImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.disabledColor,
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: "hidden",
  },
  Text: {
    fontSize: 12,
    lineHeight: 12,
    textAlign: "center",
  },
});
