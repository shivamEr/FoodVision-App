import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MealPlanCard({ title, recipe, calories }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.recipe}>{recipe}</Text>
      <Text style={styles.calories}>{calories} kCal</Text>

      <TouchableOpacity style={styles.checkButton}>
        <Text style={styles.checkText}>✓</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  recipe: { color: "#bbb", marginVertical: 4 },
  calories: { color: "#6eff91" },
  checkButton: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "#444",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: { color: "#6eff91" },
});
