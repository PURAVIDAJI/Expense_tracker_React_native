import { Pressable, StyleSheet, Text, View } from "react-native";

function ExpenseItem(props) {
  const expenseDate = new Date(props.date).toLocaleDateString();
  return (
    <>
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.box}>
          <View style={styles.letter}>
            <Text style={styles.letterText}>{props.history}</Text>
            <Text style={styles.letterText2}>{expenseDate}</Text>
          </View>
          <View style={styles.number}>
            <Text style={styles.numberText}>${props.amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#Fb8500",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  letter: {
    flex: 3,
  },
  letterText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  letterText2: {
    color: "white",

    marginTop: 5,
  },
  number: {
    flex: 1,

    backgroundColor: "#ffb703",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  numberText: {
    color: "#023047",
  },

  pressed: {
    opacity: 0.5,
  },
});
