import { Modal } from "@/shared/ui/modal/Modal";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

type DeleteAccountModalProps = {
  isVisible: boolean;
  onDismiss: Function;
  onSubmit: Function;
};
export const DeleteHabitModal = (props: DeleteAccountModalProps) => {
  return (
    <Modal isVisible={props.isVisible} onDismiss={() => props.onDismiss()}>
      <Text style={styles.ModalText}>
        Are you sure you want to delete your habit?
      </Text>
      <View style={styles.ButtonsWrapper}>
        <Button
          mode="outlined"
          style={styles.Button}
          onPress={() => {
            props.onSubmit();
          }}
        >
          Yes
        </Button>
        <Button
          mode="contained"
          style={styles.Button}
          onPress={() => {
            props.onDismiss();
          }}
        >
          No
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalText: {
    textAlign: "center",
    marginBottom: 20,
  },
  ButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Button: {
    width: "45%",
  },
});
