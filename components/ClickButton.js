import { Pressable, StyleSheet, Text } from "react-native";

function ClickButton(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [styles.general, pressed && styles.pressed]}
    >
      {({ pressed }) => (
        <Text style={[styles.text, pressed && styles.textPressed]}>
          {props.name}
        </Text>
      )}
    </Pressable>
  );
}
export default ClickButton;
const styles = StyleSheet.create({
  general: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: "#219EBC",
  },

  text: { color: "#c7c7c7" },
  // #c7c7c7
  textPressed: {
    color: "#F0F0F0",
    fontWeight: "bold",
  },
});
