import { Colors } from "@/shared/config/constants";
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const EmptyList = () => {
  return (
    <View style={styles.Wrapper}>
      <Text style={styles.Text}>Your list is empty.</Text>
      <Icon name="emoticon-sad-outline" size={100} color={Colors.accentColor} />
    </View>
  )
}
const styles = StyleSheet.create({
  Wrapper: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  Text: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.accentColor,
  }
})