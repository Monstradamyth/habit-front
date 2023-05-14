import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  ToastType,
  ToastsFactory,
  useToastsStore,
} from "@/shared/ui/toast/toasts-factory";
import { Text } from "react-native-paper";
import { Colors } from "@/shared/config/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ToastsViewProps = {
  model: ToastsFactory;
};

export const ToastsView = ({model}: ToastsViewProps) => {
  const toasts = useToastsStore((state) => state.toasts)

  const toastBg = (type: ToastType) => {
    switch (type) {
      case "ERROR":
        return styles.Error;
      case "SUCCESS":
      default:
        return styles.Success;
    }
  };

  return (
    <View style={[styles.ToastsWrapper]}>
      {toasts.map((toast, index) => (
        <View key={index} style={[styles.Toast, toastBg(toast.type)]}>
          {toast.type === "ERROR" && (
            <Icon color={Colors.white} name="alert-circle-outline" size={24} />
          )}
          <Text style={styles.Text}>{toast.message}</Text>
          <Pressable
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => model.methods.removeToastById(toast.id)}
          >
            <Icon name="close" color={Colors.white} size={18} />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ToastsWrapper: {
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    bottom: 68,
  },
  Toast: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 15,
    width: 350,
    minHeight: 50,
    borderRadius: 10,
    zIndex: 999999,
    marginTop: 10,
  },
  Error: {
    backgroundColor: Colors.toast.error,
  },
  Success: {
    backgroundColor: Colors.toast.success,
  },
  Text: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
    flex: 1,
    paddingHorizontal: 10,
  },
});
