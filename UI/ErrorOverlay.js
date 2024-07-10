import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

//로딩 중일 때의 로딩 스피너
function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>OK</Button>
      {/* 이 http 요청 실패했더라도, 다른  */}
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#023047",
  },
  text: {
    textAlign: "center",
    color: "white",
    marginBottom: 8,
  },
  title: { fontSize: 20, fontWeight: "bold" },
});
