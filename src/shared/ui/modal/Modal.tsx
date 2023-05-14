import { Portal, Modal as DefaultModal } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ModalProps = {
  isVisible: boolean;
  onDismiss: Function;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Modal = (props: ModalProps) => {
  return (
    <Portal>
      <DefaultModal
        visible={props.isVisible}
        onDismiss={() => props.onDismiss()}
        contentContainerStyle={[styles.ContentContainerStyle, props.style]}
      >
        <Pressable
          style={styles.IconWrapper}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          onPress={() => props.onDismiss()}
        >
          <Icon name="close" size={24} />
        </Pressable>
        {props.children}
      </DefaultModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  ContentContainerStyle: {
    width: "70%",
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 25,
    borderRadius: 10,
  },
  IconWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
