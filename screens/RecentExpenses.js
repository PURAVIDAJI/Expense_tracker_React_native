import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { ExpenseContext } from "../store/expense-context";
import ExpenseItem from "../components/ExpenseItem";
import TotalExpenses from "../components/TotalExpenses";
import ExpenseList from "../components/ExpenseList";
import { fetchExpense } from "../util/http";
import LoadingOverLay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
function RecentExpenses({ navigation, route }) {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [isFatching, setIsFatching] = useState(true);
  const [error, setError] = useState();
  //const [fetchedExpenses, setFetchExpenses] = useState([]);

  //구성요소가 재렌더링 될 때마다 실행해야함
  //http 요청은 비동기 작업(즉시 완료 X)
  //promise => 다른 데이터에 관한 access 권한 제공하는 개체

  useEffect(() => {
    async function getExpenses() {
      setIsFatching(true);
      try {
        const expenses = await fetchExpense();
        setExpenses(expenses);
        //패치되었을 때만, 로컬에서도 상태 업데이트되기를 바라므로 위치를 여기에
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFatching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !isFatching) {
    //에러메세지가 존재하고,fetching중이 아닐때,(로딩중 아닐 때)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFatching) {
    return <LoadingOverLay />;
  }

  //데이터를 얻기 위해 비동기 대기 기능 사용할 수 있음.
  //Effect 함수 자체를 비동기 함수로 바꾸지 않고 비동기 기다리는 걸 사용할 수 있음.
  //효과 함수 자체는 promist 반환하면 안된다.
  //useEffect 훅은 리액트 컴포넌트가 렌더링 될 때, 혹은 특정 의존성 배열이 변경될 때 부수 효과 수행할 수 있게 해줌
  // useEffect는 동기 함수만 직접 지원, 비동기 함수를 호출하려면 useEffect 안에서 비동기 함수를 정의하고 호출해야 함.
  //리스트에서 새로운 expense추가하면, 새로운 expense가 추가되지않는데, 그 이유는 새로운 거 추가가 모달 형식으로 되기 때문에, 뒤에 백그라운드에 이미 존재하고 있음
  //컨텍스를 계속사용하자, 백엔드에서 가져오지 말고 이미 로컬 디바이스에 있는 데이터를 사용하고 오프라인으로도 업데이트할 수 있게 함.
  const Today = new Date();

  const recentExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const timeDiff = Today - expenseDate;
    return timeDiff / (1000 * 3600 * 24) <= 7;
  });

  return (
    <>
      <TotalExpenses data={recentExpenses} />
      <ExpenseList expense={recentExpenses} navigation={navigation} />
    </>
  );
}
export default RecentExpenses;
