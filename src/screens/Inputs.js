import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";

export default function Inputs({ setTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  appHeader: { fontSize: 25, textTransform: "uppercase", marginBottom: 20 },
  inputField: {
    borderWidth: 1,
    borderColor: "#aeaeae",
    marginBottom: 10,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: Platform.OS === "android" ? "darkcyan" : "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
