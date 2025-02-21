import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

function TodoList({ navigation }) {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filterType, setFilterType] = useState("All");

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("todo");
      if (storedData) {
        setTodo(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  function handleAddTask() {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }
    const newTask = { id: Date.now(), title, description, done: false };
    setTodo((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
  }

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
    loadData();
  }, []);

  useEffect(() => {
    saveData(todo);
  }, [todo]);

  const filteredTasks = todo.filter((task) => {
    if (filterType === "Done") return task.done;
    if (filterType === "In Progress") return !task.done;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.container}>
        <Text style={styles.appHeader}>Todo App</Text>

        <TextInput
          style={styles.inputField}
          placeholder="Enter Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleAddTask}>
          <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btns, filterType === "All" && styles.activeBtn]}
            onPress={() => setFilterType("All")}
          >
            <Text style={{ color: filterType === "All" ? "white" : "black" }}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btns,
              filterType === "In Progress" && styles.activeBtn,
            ]}
            onPress={() => setFilterType("In Progress")}
          >
            <Text
              style={{
                color: filterType === "In Progress" ? "white" : "black",
              }}
            >
              In Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btns, filterType === "Done" && styles.activeBtn]}
            onPress={() => setFilterType("Done")}
          >
            <Text style={{ color: filterType === "Done" ? "white" : "black" }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TodoDetails", { task: item })}
              style={styles.taskItem}
            >
              <AntDesign
                name={item.done ? "checkcircle" : "check"}
                size={20}
                color="green"
                onPress={() => handleDone(item.id)}
              />
              <Text
                style={[styles.flatListItem, item.done && styles.completedTask]}
              >
                {item.title} - {item.description}
              </Text>
              <AntDesign
                onPress={() => handleRemoveTask(item.id)}
                name="delete"
                size={20}
                color="red"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  appHeader: { fontSize: 25, textTransform: "uppercase", marginBottom: 20 },
  inputField: {
    borderWidth: 1,
    borderColor: "#aeaeae",
    marginBottom: 10,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: Platform.OS === "android" ? "green" : "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  btns: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  activeBtn: {
    backgroundColor: "green",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  flatListItem: { flex: 1, fontSize: 16 },
  completedTask: { textDecorationLine: "line-through", color: "gray" },
});

export default TodoList;
