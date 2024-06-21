import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Card from "./Card";

const InputTag = () => {
  const [text, setText] = useState<string>("");
  const [arr, setArr] = useState<{ note: string; color: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [clr, setClr] = useState<string>("");

  // Usage
  const colorArray: string[] = [
    "#3FA349",
    "#A17DEB",
    "#F6C876",
    "#8E4FD5",
    "#E6B852",
    "#4D4D86",
    "#6ECD51",
    "#5E3082",
    "#B9A2EB",
    "#B892E3",
    "#C479A0",
    "#F0DAA6",
    "#66C82C",
    "#76E23D",
    "#B5A7F5",
    "#F7A5BC",
    "#C5E188",
    "#A0D2DA",
    "#9D7BB1",
    "#E0C57D",
  ];

  const handlePress = () => {
    if (text === "" || clr === "") {
      Alert.alert(text === "" ? "Enter Text!!" : "Select color!!");
    } else {
      if (editingIndex !== null) {
        // Update existing note
        const updatedArr = [...arr];
        updatedArr[editingIndex] = { note: text, color: clr };
        setArr(updatedArr);
        setEditingIndex(null);
      } else {
        // Add new note
        const updatedArr = [...arr, { note: text, color: clr }];
        setArr(updatedArr);
      }
      setText("");
      setClr("");
    }
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  const handleDelete = (index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    setArr(newArr);
  };

  const handleClearAll = () => {
    setArr([]);
  };

  const handleEdit = (index: number, note: string, color: string) => {
    setText(note);
    setClr(color);
    setEditingIndex(index);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem("notes");
        if (savedNotes !== null) {
          // Convert the JSON string back to an array
          setArr(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    // Save data to AsyncStorage whenever `arr` changes
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("notes", JSON.stringify(arr));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
    saveData();
  }, [arr]);

  return (
    <ScrollView>
      <View style={styles.cont}>
        {colorArray.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorBox,
              { backgroundColor: item, borderWidth: clr === item ? 1 : 0 },
            ]}
            onPress={() => setClr(clr === item ? "" : item)}
          >
            
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          placeholder="Enter here"
          value={text}
        />
        <Text style={styles.btn} onPress={handlePress}>
          {editingIndex !== null ? "Update" : "Add"}
        </Text>
        <Text style={styles.btn} onPress={handleClearAll}>
          Clear All
        </Text>
      </View>
      {arr.length === 0 ? (
        <Text style={styles.settag}>No notes available</Text>
      ) : (
        <Card notes={arr} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderColor: "gray",
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "blue",
    color: "white",
    padding: 9,
  },
  settag: {
    textAlign: "center",
    margin: 30,
    fontSize: 20,
  },
  divv: {
    color: "white",
    display: "flex",
    flexDirection: "row",
  },
  cont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "40%",
  },
  colorBox: {
    width: 20,
    height: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default InputTag;
