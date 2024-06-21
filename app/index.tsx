import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navbar from "./Components/Navbar";
import InputTag from "./Components/InputTag";

export default function index() {
  return (
    <View>
      <Navbar />
      <InputTag />
    </View>
  );
}

const styles = StyleSheet.create({});
