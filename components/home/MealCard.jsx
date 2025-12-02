import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MealCard({ meal }) {
    return (
        <View style={styles.mealItem}>
            <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.mealImage}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.mealMeta}>
                    <Text style={styles.mealType}>{meal.type}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                </View>

                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
            </View>

            {meal.completed ? (
                <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
            ) : (
                <View style={styles.uncheckCircle} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    mealImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#eee" },
    mealMeta: { flexDirection: "row", alignItems: "center" },
    mealType: { fontSize: 11, color: "#0D9E71" },
    dot: { marginHorizontal: 5, color: "#999" },
    mealTime: { fontSize: 11, color: "#999" },
    mealName: { fontSize: 15, fontWeight: "500", marginTop: 2 },
    mealCalories: { fontSize: 11, color: "#666" },
    checkCircle: {
        width: 24,
        height: 24,
        backgroundColor: "#0D9E71",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    uncheckCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#ccc",
    },
});
