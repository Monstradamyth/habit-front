import { AttemptType } from "@/entities/attempt/view/types";
import { Colors } from "@/shared/config/constants";
import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Checkbox, Text } from "react-native-paper";

type AttemptListElementProps = {
  item: AttemptType;
  onPress: Function;
};

export const AttemptListElement = (props: AttemptListElementProps) => {
  const [checked, setChecked] = useState(false);
  const correctStatusStyles = () => {
    switch (props.item.status.toLowerCase()) {
      case "active":
        return styles.ActiveStatusText;
      case "inactive":
        return styles.InactiveStatusText;
      default:
        return styles.ActiveStatusText;
    }
  };
  const isDisabled = () => {
    const endDay = dayjs(props.item.endDate);
    const today = dayjs();
    return endDay.isBefore(today);
  };
  return (
    <Pressable onPress={() => console.log('hello')}>
      <View style={styles.Content}>
        <Checkbox.Android
          disabled={isDisabled()}
          color={Colors.accentColor}
          uncheckedColor={Colors.disabledColor}
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={styles.Title}>Attempt</Text>
        <Text style={correctStatusStyles()}>{props.item.status}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Content: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  Title: {},
  ActiveStatusText: {
    textTransform: "capitalize",
    color: Colors.activeColor,
  },
  InactiveStatusText: {
    textTransform: "capitalize",
    color: Colors.inactiveColor,
  },
});
