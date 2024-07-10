import { createContext, useReducer, useState } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expense) => {},
  //초기값 설정
});

function expensesReducer(state, action) {
  //현재 상태와 동작 객체를 자동으로 수신함.
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return action.payload;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      ); //업데이트될 항목의 인덱스를 제공
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // 원래의 데이터에 새로운 데이터 덧입혀서 바뀐 부분 바뀌도록 해줌.
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expense) {
    dispatch({ type: "ADD", payload: expense });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expense) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expense } });
  }

  const value = {
    expenses: expenseState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );

  //실제 논리 보유 실제 공급자 함수
}

export default ExpenseContextProvider;
