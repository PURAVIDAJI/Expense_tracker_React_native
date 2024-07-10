import { Alert, Button, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import { useContext, useLayoutEffect, useState } from "react";
import { ExpenseContext } from "../store/expense-context";
import ClickButton from "../components/ClickButton";
import ExpenseInput from "../components/ExpenseInput";
import { storeExpense, updateExp, deleteExp } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const mode = route.params.mode;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { deleteExpense, updateExpense, addExpense, expenses } =
    useContext(ExpenseContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const selectedExpense = expenses.find((expense) => expense.id === expenseId);
  let titleName = mode === "update" ? "Edit Values" : "Insert Values";
  let buttonName = mode === "update" ? "Change" : "Add";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === "update" ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, mode]);

  function confirmDeleteHandler() {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: deleteHandler },
      ]
    );
  }

  function insertExpenseHandler() {
    setModalIsVisible(true);
  }
  function endInsertExpenseHandler() {
    setModalIsVisible(false);
    navigation.goBack();
  }
  async function addExpenseHandler(newExpense) {
    setIsSubmitting(true);
    try {
      if (mode === "update") {
        updateExpense(expenseId, newExpense);
        await updateExp(expenseId, newExpense);
      } else {
        const id = await storeExpense(newExpense);
        addExpense({ ...newExpense, id: id });
      }
    } catch (error) {
      setError("Could not save the data!");
      setIsSubmitting(false);
    }
  }
  //이 함수 실행하면 update든, add든, 로딩 뜨게 하고, 완료되면 어차피 뒤로 가기 되니까, 다시 false로 만들어줄 필요 X

  async function deleteHandler() {
    setIsSubmitting(true);
    try {
      await deleteExp(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!!");
      setIsSubmitting(false);
      //실패시 로딩화면 안보여주고 싶으므로!
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }

  function backToPageHandler() {
    navigation.goBack();
  }
  function changeHandler() {
    setModalIsVisible(true);
    //expenseId를 가진 정보를 가져와서 모달에 띄운다음 수정할 수 있게 만들고 다시 수정한 사항 해당 id에 저장하기 => 해당 id는 안바뀜
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <>
      {mode === "update" && (
        <>
          <View style={styles.buttons}>
            <View style={styles.firstButton}>
              <ClickButton name="Cancel" onPress={backToPageHandler} />
            </View>
            <View style={styles.firstButton}>
              <ClickButton name="Update" onPress={changeHandler} />
            </View>
          </View>
          <View style={styles.delete}>
            <IconButton
              onPress={confirmDeleteHandler}
              icon="trash-o"
              color="red"
              size={30}
            />
          </View>
          <ExpenseInput
            visible={modalIsVisible}
            onClose={endInsertExpenseHandler}
            onPress={addExpenseHandler}
            initialValues={selectedExpense}
            title={titleName}
            button={buttonName}
          />
        </>
      )}
      {mode === "input" && (
        <>
          <View style={[styles.buttons, styles.line]}>
            <View>
              <ClickButton name="Cancel" onPress={backToPageHandler} />
            </View>
            <View>
              <ClickButton name="Add" onPress={insertExpenseHandler} />
            </View>
          </View>
          <ExpenseInput
            visible={modalIsVisible}
            onClose={endInsertExpenseHandler}
            onPress={addExpenseHandler}
            title={titleName}
            button={buttonName}
          />
        </>
      )}
    </>
  );
}
export default ManageExpense;

const styles = StyleSheet.create({
  delete: {
    margin: 10,
    borderTopColor: "white",
    borderTopWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    paddingBottom: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
});
