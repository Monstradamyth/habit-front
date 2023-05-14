import { Colors } from "@/shared/config/constants";
import { Modal } from "@/shared/ui/modal/Modal";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";

type FilterModalProps = {
  isVisible: boolean;
  onDismiss: Function;
  onSubmit: Function;
};

export enum FILTER_OPTIONS {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const FilterModal = (props: FilterModalProps) => {
  const [value, setValue] = useState<FILTER_OPTIONS>(FILTER_OPTIONS.ALL);


  return (
    <Modal isVisible={props.isVisible} onDismiss={props.onDismiss}>
      <Text style={styles.ModalText}>Select which habits you want to see:</Text>
      <View style={styles.InputsWrapper}>
        <RadioButton.Group
          onValueChange={(value) => setValue(value as FILTER_OPTIONS)}
          value={value}
        >
          <RadioButton.Item
            color={Colors.accentColor}
            uncheckedColor={Colors.disabledColor}
            label="All"
            value={FILTER_OPTIONS.ALL}
          />
          <RadioButton.Item
            color={Colors.accentColor}
            uncheckedColor={Colors.disabledColor}
            label="Active"
            value={FILTER_OPTIONS.ACTIVE}
          />
          <RadioButton.Item
            color={Colors.accentColor}
            uncheckedColor={Colors.disabledColor}
            label="Inactive"
            value={FILTER_OPTIONS.INACTIVE}
          />
        </RadioButton.Group>
      </View>
      <Button
        style={styles.Button}
        mode="contained"
        onPress={() => props.onSubmit(value)}
      >
        Confirm
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalText: {
    textAlign: "center",
    fontSize: 16,
  },
  InputsWrapper: {
    marginTop: 20,
  },
  Button: {
    marginTop: 10,
  },
});
