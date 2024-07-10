import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-a3b1a-default-rtdb.asia-southeast1.firebasedatabase.app";
export async function storeExpense(ExpenseData) {
  //http 요청을 만들어서 FireBase에 보내고자 함.
  const response = await axios.post(BACKEND_URL + "/expense.json", ExpenseData);
  const id = response.data.name;
  return id;
}
//데이터 베이스 안에 폴더를 만든다. 여기서는 expense 폴더
//개체 자체를 json형식의 파일에 저장함
//또한 Firebase에서 고유의 id를 생성하므로 내가 임의로 만든 개체의 id는 삭제할 수 있다.

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expense.json");
  //아래는 응답이 완료되면 실행하는 코드
  const expenses = [];

  console.log(response.data);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      history: response.data[key].history,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
//Get expense의 경우 데이터를 받으면 되니까, 데이터를 받아올 필요가 없다.
//비동기 함수로 만드는 이유는 이 요청이 실행되는 시간동안 다른 부분이 계속 실행될 수 있도록 비동기적으로 처리해야 하기때문이다.
//서버에서 데이터를 비동기적으로 가져오고, 서버 요청 보내고, 응답올 때까지 기다렸다가 응답 처리하고 데이터 반환함.
export function updateExp(id, expenseData) {
  return axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData);
}
export function deleteExp(id) {
  //해당 id를 가진 객체 불러오고, 그 객체에 변경된 값을 다시 넣는다.

  return axios.delete(BACKEND_URL + `/expense/${id}.json`);
}
