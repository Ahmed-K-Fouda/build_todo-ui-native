import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "../screens/TodoList";
import TodoDetails from "../screens/TodoDetails";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{ title: "Todo List" }}
      />
      <Stack.Screen
        name="TodoDetails"
        component={TodoDetails}
        options={{ title: "Task Details" }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
