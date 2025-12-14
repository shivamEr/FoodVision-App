import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";

import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import Button from "../../components/shared/Button";
import Colors from "../../shared/Colors";
import { api } from "../../convex/_generated/api";
import { useRouter } from "expo-router";

export default function Meals() {
  const recipeList = useQuery(api.Recipes.GetAllRecipes);
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Recipes</Text>
      </View>

      {/* AI Recommendation */}
      <View style={styles.aiBanner}>
        <GenerateRecipeCard />
      </View>

      {/* Meal Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested Meals</Text>

        {/* Loading / Empty State */}
        {!recipeList && (
          <Text style={styles.loadingText}>Loading recipes...</Text>
        )}

        {recipeList?.map((meal) => (
          <View key={meal._id} style={styles.mealCard}>
            <Image
              source={{
                uri: meal.imageURI || "https://via.placeholder.com/400x300",
              }}
              style={styles.mealImage}
            />

            <View style={styles.mealContent}>
              <Text style={styles.mealName}>
                {meal.recipeName || "Unnamed Recipe"}
              </Text>

              {/* Nutrition */}
              <View style={styles.nutritionRow}>
                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Cal</Text>
                  <Text style={styles.nutValue}>
                    {meal?.jsonData?.calories ?? "--"}
                  </Text>
                </View>

                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Prot</Text>
                  <Text style={styles.nutValue}>
                    {meal?.jsonData?.protien ?? "--"}g
                  </Text>
                </View>

                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Carb</Text>
                  <Text style={styles.nutValue}>
                    {meal?.jsonData?.carbs ?? "--"}g
                  </Text>
                </View>

                <View style={styles.nutBox}>
                  <Text style={styles.nutLabel}>Fat</Text>
                  <Text style={styles.nutValue}>
                    {meal?.jsonData?.fats ?? "--"}g
                  </Text>
                </View>
              </View>

              {/* Prep Time */}
              <View style={styles.timeBadge}>
                <MaterialIcons name="schedule" size={14} color="#555" />
                <Text style={styles.timeText}>
                  {meal?.jsonData?.cookTime ?? "N/A"} min
                </Text>
              </View>

              <Button title="Explore Recipe Details" onPress={()=>router.push({
                pathname: "/recipe-detail",
                params: {
                    recipeId: meal._id,
                }
              })}/>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },

  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  aiBanner: {
    margin: 5,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
  },

  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  loadingText: {
    textAlign: "center",
    color: "#777",
    marginVertical: 20,
  },

  mealCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },
  mealImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#DDD",
  },
  mealContent: {
    padding: 14,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutBox: {
    width: "23%",
    backgroundColor: "#F2F3F4",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  nutLabel: {
    fontSize: 10,
    color: "#666",
  },
  nutValue: {
    fontSize: 12,
    fontWeight: "600",
  },

  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignSelf: "flex-start",
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#555",
  },
});
