import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import IconButton from "../components/IconButton";
import ExpenseInput from "../components/ExpenseInput";
import { ExpenseContext } from "../store/expense-context";
import TotalExpenses from "../components/TotalExpenses";
import ExpenseList from "../components/ExpenseList";

function AllExpenses({ navigation }) {
  const { expenses } = useContext(ExpenseContext);

  return (
    <>
      <TotalExpenses data={expenses} />
      <ExpenseList expense={expenses} navigation={navigation} />
    </>
  );
}
export default AllExpenses;

const styles = StyleSheet.create({});
