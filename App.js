import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllExpenses from "./screens/AllExpenses";
import ExpenseInput from "./components/ExpenseInput";
import RecentExpenses from "./screens/RecentExpenses";
import { FontAwesome } from "@expo/vector-icons";
import ExpenseContextProvider from "./store/expense-context";
import ManageExpense from "./screens/ManageExpense";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#023047" }}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#219EBC" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#219EBC" },
        tabBarActiveTintColor: "#023047",
        tabBarInactiveTintColor: "white",
        headerRight: () => {
          return (
            <IconButton
              onPress={() => {
                navigation.navigate("Edit Expense", {
                  mode: "input",
                  expenseId: null,
                });
              }}
              icon="plus"
              color="black"
            />
          );
        },
      })}
    >
      {/* tab부분에만 + 아이콘이 들어가므로 여기에 headerRight으로 선언할 수 잇는데, useNavigation을 import해서 화면간 이동을 수행해도 되지만, 여기서는, ScreenOption 사용시 함수를 보낼 수 있다는 특징을 사용하여, navigation을 변수로 받고, IconButton 임포트할 때, onPress에 navigation을 사용해서 화면의 이동을 수행함. */}
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome color={color} size={size} name="calendar" />
          ),
        }}
      />
      <Tab.Screen
        name="Recent Expenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome color={color} size={size} name="hourglass-2" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#219EBC" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#023047" },
            }}
          >
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Add Expense" component={ExpenseInput} />
            <Stack.Screen
              name="Edit Expense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
