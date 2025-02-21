import { View, Text, StyleSheet } from "react-native";

function TodoDetails({ route }) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {task.title}</Text>
      <Text style={styles.description}>Description: {task.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 18, marginTop: 10 },
});

export default TodoDetails;
