import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function TodoItems({
  item,
  handleDone,
  handleRemoveTask,
  navigation,
}) {
  return (
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
      <Text style={[styles.flatListItem, item.done && styles.completedTask]}>
        {item.title} - {item.description}
      </Text>
      <AntDesign
        onPress={() => handleRemoveTask(item.id)}
        name="delete"
        size={20}
        color="red"
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  flatListItem: { flex: 1, fontSize: 16, marginInline: "1rem" },
  completedTask: {
    textDecorationLine: "line-through",
    marginLeft: 5,
    color: "gray",
  },
});
