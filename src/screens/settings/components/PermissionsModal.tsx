import { Modal } from "@/shared/ui/modal/Modal";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

type PermissionsModalProps = {
  isVisible: boolean;
  onDismiss: Function;
  onSubmit: Function;
};

export const PermissionsModal = (props: PermissionsModalProps) => {
  return (
    <Modal isVisible={props.isVisible} onDismiss={() => props.onDismiss()}>
      <Text style={styles.ModalText}>
        You need to give permissions in order to upload an image
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          props.onSubmit();
        }}
      >
        Go To Settings
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalText: {
    textAlign: "center",
    marginBottom: 20,
  },
});
