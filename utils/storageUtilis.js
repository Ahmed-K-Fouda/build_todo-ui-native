import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const loadData = async (key, setData) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  } catch (error) {
    console.error("Error loading data", error);
  }
};
