import { useState } from "react";
import { KeyboardType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type InputProps = {
  label: string;
  value: string;
  onChange: Function;
  errorText?: string;
  style?: StyleProp<ViewStyle>;
  hasError?: boolean;
  infoText?: string;
  keyboardType?: KeyboardType;
  isTextArea?: boolean;
  secureTextEntry?: boolean;
  disabled?: boolean;
};

export const Input = (props: InputProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const showError = () => {
    return props.hasError && isDirty;
  };
  return (
    <View style={props.style}>
      <TextInput
        {...props}
        label={props.label}
        value={props.value}
        onBlur={() => {
          setIsDirty(true);
          props.infoText && setShowHint(false);
        }}
        multiline={props.isTextArea}
        numberOfLines={props.isTextArea ? 5 : 1}
        onFocus={() => props.infoText && setShowHint(true)}
        onChange={(text) => props.onChange(text.nativeEvent.text)}
        keyboardType={props.keyboardType || "default"}
      />
      {showError() && <HelperText style={styles.Hint} type="error">{props.errorText}</HelperText>}
      {showHint && <HelperText style={styles.Hint} type="info">{props.infoText}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  Hint: {
    paddingTop: 0,
  }
})