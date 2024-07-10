import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
//expo go에서 사용불가
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import DatepickerButton from "./DatepickerButton";

function ExpenseInput(props) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [enteredHistory, setEnteredHistory] = useState("");
  const [amount, setAmount] = useState("");
  const [historyError, setHistoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    if (props.initialValues) {
      setDate(new Date(props.initialValues.date));
      setEnteredHistory(props.initialValues.history);
      setAmount(props.initialValues.amount.toString());
    }
  }, [props.initialValues]);

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
  }
  const showDatePicker = () => {
    setShowPicker(true);
  };

  function historyInputHandler(enteredText) {
    setEnteredHistory(enteredText);
    if (enteredText) {
      setHistoryError(false);
    }
  }
  function amountHandler(money) {
    setAmount(money);
    if (money) {
      setAmountError(false);
    }
  }
  function addExpenseHandler() {
    let valid = true;

    if (!enteredHistory) {
      setHistoryError(true);
      valid = false;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setAmountError(true);
      valid = false;
    }

    if (!valid) {
      Alert.alert("Invalid Input", "Please fill out all fields correctly!");
      return;
    }
    const newExpense = {
      date: date.toISOString(),
      history: enteredHistory,
      amount: parseInt(amount),
    };
    props.onPress(newExpense);
    resetInputs();
    props.onClose();
  }
  function cancelHandler() {
    resetInputs();
    props.onClose();
  }

  function resetInputs() {
    setDate(new Date());
    setEnteredHistory("");
    setAmount("");
  }
  return (
    <Modal visible={props.visible} backgroundColor="red" animationType="slide">
      {/* 지출일 */}
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.marginMaking}>
        <View style={styles.eachItem}>
          <Text style={styles.dateText}>Date </Text>

          <DatepickerButton
            title={date.toLocaleDateString()}
            onPress={showDatePicker}
          />

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.eachItem}>
          {/* 지출내역 */}
          <Text style={styles.otherText}>Spending history</Text>
          <TextInput
            style={[styles.contentInput, historyError && styles.borderError]}
            placeholder="Where did you spend your money?"
            value={enteredHistory} //양방향 바인딩
            onChangeText={historyInputHandler}
            //autoCorrect="false"
          />
        </View>
        <View style={styles.eachItem}>
          {/* 지출금액 */}
          <Text style={styles.otherText}>Expense Amount</Text>
          <TextInput
            style={[styles.contentInput, amountError && styles.borderError]}
            placeholder="How much is the amount spent?"
            value={amount}
            onChangeText={amountHandler}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.submitButton}>
        <View style={styles.eachButton}>
          <Button title="Cancel" onPress={cancelHandler} color="#Fb8500" />
        </View>
        <View style={styles.eachButton}>
          <Button title={props.button} onPress={addExpenseHandler} />
        </View>
      </View>
    </Modal>
  );
}

export default ExpenseInput;
const styles = StyleSheet.create({
  title: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 25,
    color: "#023047",
    marginTop: 90,
    marginVertical: 10,
    fontWeight: "bold",
  },

  marginMaking: {
    backgroundColor: "#023047",
    marginHorizontal: 30,
    paddingHorizontal: 20,

    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentInput: {
    backgroundColor: "#8EBFDC",
    borderRadius: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  borderError: {
    backgroundColor: "#D9534F",
  },
  dateText: { marginBottom: 10, color: "white", fontWeight: "bold" },
  otherText: { color: "white", fontWeight: "bold" },
  eachItem: {
    marginVertical: 10,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
  },
  eachButton: {
    marginHorizontal: 10,
    width: 100,
  },
});
