import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function Meals() {
  const [selectedDay, setSelectedDay] = useState(2);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [25, 26, 27, 28, 29, 30, 1];

  const mealSuggestions = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      calories: 485,
      protein: 24,
      carbs: 58,
      fat: 18,
      prepTime: 25,
      tags: ["High Protein", "Vegan"],
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Grilled Chicken & Sweet Potato",
      calories: 520,
      protein: 42,
      carbs: 48,
      fat: 14,
      prepTime: 30,
      tags: ["High Protein", "Low Fat"],
      img: "https://images.unsplash.com/photo-1598103442097-8138fb7ad3dc?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Teriyaki Salmon Rice Bowl",
      calories: 580,
      protein: 38,
      carbs: 52,
      fat: 22,
      prepTime: 20,
      tags: ["Omega-3", "Balanced"],
      img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Plan</Text>

        {/* Week Selector */}
        <View style={styles.weekSelector}>
          <TouchableOpacity>
            <AntDesign name="left" size={20} color="#888" />
          </TouchableOpacity>

          <View style={styles.daysRow}>
            {days.map((day, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dayBtn,
                  selectedDay === i && styles.dayBtnActive,
                ]}
                onPress={() => setSelectedDay(i)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDay === i && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDay === i && styles.dateTextActive,
                  ]}
                >
                  {dates[i]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity>
            <AntDesign name="right" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Recommendation Banner */}
      <View style={styles.aiBanner}>
        <View style={styles.aiIcon}>
          <Entypo name="flash" size={20} color="#fff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.aiTitle}>AI Recommendations</Text>
          <Text style={styles.aiSubtitle}>
            Based on your progress, we've optimized your meals
          </Text>
        </View>
      </View>

      {/* Meal Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested Meals</Text>

        {mealSuggestions.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <Image
              source={{ uri: meal.img }}
              style={styles.mealImage}
            />

            <View style={styles.mealContent}>
              <Text style={styles.mealName}>{meal.name}</Text>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {meal.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Nutrients */}
              <View style={styles.nutritionRow}>
                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Cal</Text>
                  <Text style={styles.nutValue}>{meal.calories}</Text>
                </View>
                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Prot</Text>
                  <Text style={styles.nutValue}>{meal.protein}g</Text>
                </View>
                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Carb</Text>
                  <Text style={styles.nutValue}>{meal.carbs}g</Text>
                </View>
                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Fat</Text>
                  <Text style={styles.nutValue}>{meal.fat}g</Text>
                </View>
              </View>

              {/* Prep Time */}
              <View style={styles.timeBadge}>
                <MaterialIcons name="schedule" size={14} color="#555" />
                <Text style={styles.timeText}>{meal.prepTime} min</Text>
              </View>

              {/* Add Button */}
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add to Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  weekSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysRow: { flexDirection: "row", gap: 8 },
  dayBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  dayBtnActive: { backgroundColor: "#0D9E71" },
  dayText: { fontSize: 12, color: "#555" },
  dayTextActive: { color: "#fff", fontWeight: "700" },
  dateText: { fontSize: 14, color: "#444", marginTop: 2 },
  dateTextActive: { color: "#fff" },

  aiBanner: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#B95FEB",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  aiIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aiTitle: { color: "#fff", fontWeight: "700", marginBottom: 2 },
  aiSubtitle: { color: "#FFF8", fontSize: 12 },

  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },

  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },
  mealImage: {
    height: 160,
    width: "100%",
    backgroundColor: "#ddd",
  },
  mealContent: { padding: 14 },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },

  tagsRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  tag: {
    backgroundColor: "#E7FAF3",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  tagText: { fontSize: 10, color: "#0D9E71" },

  nutritionRow: { flexDirection: "row", justifyContent: "space-between" },
  nutBox: {
    backgroundColor: "#F2F3F4",
    padding: 8,
    borderRadius: 8,
    width: "23%",
    alignItems: "center",
  },
  nutLabel: { fontSize: 10, color: "#666" },
  nutValue: { fontSize: 12, fontWeight: "600", color: "#111" },

  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  timeText: { fontSize: 10, color: "#555" },

  addBtn: {
    marginTop: 12,
    backgroundColor: "#0D9E71",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
