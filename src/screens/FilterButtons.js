import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function FilterButtons({ filterType, setFilterType }) {
  return (
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
        style={[styles.btns, filterType === "In Progress" && styles.activeBtn]}
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
  );
}
const styles = StyleSheet.create({
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
});
