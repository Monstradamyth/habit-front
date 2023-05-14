import { Colors, Offset } from "@/shared/config/constants";
import { Card } from "@/shared/ui/card/Card";
import { StyleSheet, Pressable, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderProps = {
  onFilterPress: Function;
};

const { width } = Dimensions.get('window');

export const Header = (props: HeaderProps) => {
  return (
    <Card style={styles.Header}>
      <Text style={styles.Text}>Your habits</Text>
      <Pressable
        style={styles.Icon}
        onPress={() => props.onFilterPress()}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <Icon color={Colors.accentColor} name="filter-menu-outline" size={30} />
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  Header: {
    width: width - Offset.paddingHorizontal * 2,
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    alignSelf: 'center',
    flex: 0,
  },
  Text: {
    flex: 1,
    fontSize: 26,
    alignSelf: "center",
    textAlign: "center",
    color: Colors.accentColor,
  },
  Icon: {
    position: "absolute",
    right: 20,
    top: 24,
  },
});
