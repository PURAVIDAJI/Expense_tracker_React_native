import { Pressable, StyleSheet, Text } from "react-native";

function DatepickerButton(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [styles.general, pressed && styles.pressed]}
    >
      <Text style={styles.dateText}>{props.title}</Text>
    </Pressable>
  );
}

export default DatepickerButton;

const styles = StyleSheet.create({
  general: {
    backgroundColor: "#8EBFDC",
    borderRadius: 2,

    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: "#219EBC",
  },
  dateText: {
    color: "grey",
  },
});
