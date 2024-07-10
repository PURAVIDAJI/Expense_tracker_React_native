import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expense, navigation }) {
  function renderExpenseItem(itemData) {
    function pressHandler() {
      navigation.navigate("Edit Expense", {
        mode: "update",
        expenseId: itemData.item.id,
      });
    }
    return (
      <ExpenseItem
        date={itemData.item.date}
        amount={itemData.item.amount}
        history={itemData.item.history}
        onPress={pressHandler}
      />
    );
  }
  return (
    <>
      <FlatList
        data={expense}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
export default ExpenseList;
