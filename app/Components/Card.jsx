import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Card = ({ notes, onDelete, onEdit }) => {
  return (
    <View style={styles.cardContainer}>
      {notes.map((item, index) => (
        <View
          key={index}
          style={[styles.card, { backgroundColor: item.color }]}
        >
          <Text style={styles.text}>{item.note}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deletebtn}
              onPress={() => onDelete(index)}
            >
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editbtn}
              onPress={() => onEdit(index, item.note, item.color)}
            >
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: 170,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  
  },
  text: {
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  deletebtn: {
    fontSize: 20,
  },
  editbtn: {
    fontSize: 20,
  },
});

export default Card;
