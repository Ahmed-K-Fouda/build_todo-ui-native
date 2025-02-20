import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

function App() {
  const [todo, setTodo] = useState([
    { title: "go to gym", description: "Swimming", done: false },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.container}>
        <Text style={styles.appHeader}>Todo App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Title"
            value={title}
            onChangeText={(e) => setTitle(e.target.value)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Description"
            value={description}
            onChangeText={(e) => setDescription(e.target.value)}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.btns, styles.activeBtn]}>
            <Text style={{ color: "white", textAlign: "center" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns}>
            <Text style={{ color: "black", textAlign: "center" }}>
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns}>
            <Text style={{ color: "black", textAlign: "center" }}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={todo}
            keyExtractor={(data) => data.title}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.flatListItem}>{item.title}</Text>
                <Text style={styles.flatListItem}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: "100vw",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    width: "100%",
  },
  appHeader: {
    fontSize: 25,
    textTransform: "uppercase",
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  inputContainer: {
    width: "100%",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#aeaeae",
    width: "100%",
    marginVertical: 10,
    height: 50,
    padding: 10,
    borderRadius: 5,
  },
  submitContainer: {
    width: "100%",
  },
  submitBtn: {
    backgroundColor: "green",
    width: "50%",
    padding: 10,
    marginBlock: 10,
    marginInline: "auto",
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  btns: {
    width: "30%",
    padding: 10,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    color: "#000",
  },
  activeBtn: {
    color: "#fff",
    backgroundColor: "#000",
  },
  flatListContainer: {
    width: "100%",
    marginBlock: 20,
  },
  flatListItem: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBlock: 12,
  },
});
export default App;
