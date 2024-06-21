import { StyleSheet, Text, View, Image } from "react-native";

import React from "react";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Image source={require("../logo.png")} style={styles.logo} />
      <Text style={styles.navtext}>Notes App</Text>
      <Text style={styles.userlogo}>✍🏻</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    gap: 20,
    margin: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    padding: 20,
  },
  navtext: {
    fontSize: 34,
  },
  logo: {
    width: 50,
    height: 50,
  },
  userlogo: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
});
