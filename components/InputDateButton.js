import { Pressable, Text } from "react-native";

function InputDateButton(props) {
  return (
    <Pressable>
      <Text>{props.title}</Text>
    </Pressable>
  );
}
