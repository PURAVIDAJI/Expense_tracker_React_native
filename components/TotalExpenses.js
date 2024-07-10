import { StyleSheet, Text, View } from "react-native";

function TotalExpenses({ data }) {
  //const expenseDate = new Date(props.date).toLocaleDateString();

  const totalExpenses = data.reduce((accumulator, currentExpense) => {
    return accumulator + currentExpense.amount;
  }, 0);

  return (
    <>
      <View style={styles.box}>
        <View style={styles.letter}>
          <Text style={styles.letterText}>Total Amount</Text>
        </View>
        <View style={styles.number}>
          <Text style={styles.numberText}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </View>
    </>
  );
}
export default TotalExpenses;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  letter: {
    flex: 3,
  },
  letterText: {
    color: "#Fb8500",
    fontWeight: "bold",
    fontSize: 15,
  },

  number: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: "#Fb8500",
    fontWeight: "bold",
    fontSize: 15,
  },
});
