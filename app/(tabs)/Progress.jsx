import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

export default function Progress() {
  const weeklyData = [
    { day: "Mon", value: 85 },
    { day: "Tue", value: 78 },
    { day: "Wed", value: 92 },
    { day: "Thu", value: 88 },
    { day: "Fri", value: 95 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 82 },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  const achievements = [
    {
      id: 1,
      title: "7-Day Streak",
      description: "Logged meals for 7 days straight",
      emoji: "🔥",
      bgColor: "#ff9c6a",
    },
    {
      id: 2,
      title: "Protein Goal",
      description: "Hit protein target 5 days this week",
      emoji: "💪",
      bgColor: "#6ab7ff",
    },
    {
      id: 3,
      title: "Calorie Champion",
      description: "Stayed within calorie range",
      emoji: "⭐",
      bgColor: "#ffd966",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerText}>Keep up the great work!</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.cards}>
        {/* Weight */}
        <View style={[styles.card, { backgroundColor: "#0D9E71" }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Feather name="trending-down" size={16} color="#fff" />
            </View>
            <Text style={styles.cardLabel}>Weight</Text>
          </View>
          <Text style={styles.cardValue}>72.5 kg</Text>
          <Text style={styles.cardSubText}>-2.3 kg this month</Text>
        </View>

        {/* Streak */}
        <View style={[styles.card, { backgroundColor: "#B95FEB" }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Feather name="trending-up" size={16} color="#fff" />
            </View>
            <Text style={styles.cardLabel}>Streak</Text>
          </View>
          <Text style={styles.cardValue}>12 days</Text>
          <Text style={styles.cardSubText}>Personal best!</Text>
        </View>
      </View>

      {/* Weekly Adherence */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Weekly Adherence</Text>
          <TouchableOpacity style={styles.chartBtn}>
            <Ionicons name="calendar-outline" size={14} color="#0D9E71" />
            <Text style={styles.chartBtnText}>This Week</Text>
          </TouchableOpacity>
        </View>

        {/* Bars */}
        <View style={styles.barContainer}>
          {weeklyData.map((d) => (
            <View key={d.day} style={styles.barBox}>
              <View style={[styles.bar, { height: `${(d.value / maxValue) * 100}%` }]} />
              <Text style={styles.barLabel}>{d.day}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.chartFooter}>
          <Text style={styles.chartFooterBold}>86%</Text> average adherence
        </Text>
      </View>

      {/* Achievements */}
      <Text style={styles.sectionTitle}>Recent Achievements</Text>
      {achievements.map((a) => (
        <View key={a.id} style={styles.achievementRow}>
          <View style={[styles.emojiBox, { backgroundColor: a.bgColor }]}>
            <Text style={styles.emoji}>{a.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementTitle}>{a.title}</Text>
            <Text style={styles.achievementText}>{a.description}</Text>
          </View>
        </View>
      ))}

      {/* Measurements */}
      <View style={styles.measureCard}>
        <Text style={styles.measureTitle}>Body Measurements</Text>

        {[
          ["Body Fat %", "18.2%"],
          ["Muscle Mass", "58.4 kg"],
          ["BMI", "22.1"],
          ["Water %", "62.8%"],
        ].map(([label, value], i, arr) => (
          <View
            key={label}
            style={[
              styles.measureRow,
              i !== arr.length - 1 && styles.measureDivider,
            ]}
          >
            <Text style={styles.measureLabel}>{label}</Text>
            <Text style={styles.measureValue}>{value}</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  headerText: { color: "#666" },

  cards: {
    marginTop: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 12,
  },

  card: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: { color: "#fff", fontSize: 12 },
  cardValue: { color: "#fff", fontSize: 20, fontWeight: "700" },
  cardSubText: {
    marginTop: 4,
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },

  chartCard: {
    marginTop: 24,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 18,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chartTitle: { fontWeight: "700", color: "#222" },
  chartBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  chartBtnText: { color: "#0D9E71", fontSize: 13 },

  barContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 130,
    marginBottom: 12,
  },
  barBox: { alignItems: "center", flex: 1 },
  bar: {
    width: "50%",
    backgroundColor: "#0D9E71",
    borderRadius: 6,
  },
  barLabel: { fontSize: 10, color: "#666", marginTop: 6 },

  chartFooter: { textAlign: "center", color: "#666" },
  chartFooterBold: { color: "#222", fontWeight: "700" },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 20,
    color: "#222",
  },

  achievementRow: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  emojiBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 22 },
  achievementTitle: { fontWeight: "600" },
  achievementText: { fontSize: 12, color: "#666" },

  measureCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    marginBottom: 50,
  },
  measureTitle: { fontWeight: "700", marginBottom: 14, fontSize: 16 },
  measureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  measureDivider: { borderBottomWidth: 1, borderBottomColor: "#eee" },
  measureLabel: { color: "#666" },
  measureValue: { fontWeight: "600", color: "#222" },
});
