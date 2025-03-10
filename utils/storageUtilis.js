import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const loadData = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error loading data", error);
    return null;
  }
};
