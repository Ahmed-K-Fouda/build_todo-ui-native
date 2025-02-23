import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import Inputs from "./Inputs";
import TodoItems from "./TodoItems";
import FilterButtons from "./FilterButtons";
import { loadData, saveData } from "../../utils/storageUtilis";

function TodoList({ navigation }) {
  const [todo, setTodo] = useState([]);

  const [filterType, setFilterType] = useState("All");

  function handleRemoveTask(id) {
    setTodo((prev) => prev.filter((el) => el.id !== id));
  }

  function handleDone(id) {
    setTodo((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  useEffect(() => {
    loadData("todo", setTodo);
  }, []);

  useEffect(() => {
    saveData("todo", todo);
  }, [todo]);

  const filteredTasks = todo.filter((task) => {
    if (filterType === "Done") return task.done;
    if (filterType === "In Progress") return !task.done;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../../assets/mytodo.jpg")}
        style={styles.backgroundImage}
      />
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.container}>
        {/* componenet */}
        <Inputs setTodo={setTodo} />
        {todo.length > 0 && (
          // {/* componenet */}
          <FilterButtons
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            // Component
            <TodoItems
              item={item}
              handleDone={handleDone}
              handleRemoveTask={handleRemoveTask}
              navigation={navigation}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: "0.5",
  },
});

export default TodoList;
