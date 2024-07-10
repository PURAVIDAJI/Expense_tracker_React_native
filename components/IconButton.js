import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
function IconButton({ icon, color, onPress, size = 24 }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        ({ pressed }) => pressed && styles.pressed,
        icon === "plus" && { paddingHorizontal: 20 },
      ]}
    >
      <FontAwesome name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
