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
import { useDispatch, useSelector } from "react-redux";
import {
  removeTask,
  setFilter,
  setTasks,
  toggleDone,
} from "../redux/todoSlice";

function TodoList({ navigation }) {
  const dispatch = useDispatch();
  const { todo, filterType } = useSelector((state) => state.todo);

  useEffect(() => {
    const fetchData = async () => {
      const storedTasks = await loadData("todo");
      if (storedTasks) {
        dispatch(setTasks(storedTasks));
      }
    };
    fetchData();
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
        <Inputs />
        {todo.length > 0 && (
          <FilterButtons
            filterType={filterType}
            setFilterType={(type) => dispatch(setFilter(type))}
          />
        )}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItems
              item={item}
              handleDone={() => dispatch(toggleDone(item.id))}
              handleRemoveTask={() => dispatch(removeTask(item.id))}
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
