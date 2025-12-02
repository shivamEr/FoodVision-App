import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

export default function TodayProgress({ calories = 2100 }) {
    const today = new Date().toDateString();

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Today’s Progress</Text>

                {/* Added Date */}
                <Text style={styles.dateText}>{today}</Text>
            </View>

            <Text style={styles.cardSubtitle}>1420 / {calories} kcal</Text>

            <View style={styles.progressBackground}>
                <View style={styles.progressFill} />
            </View>

            <View style={styles.macrosRow}>
                <View style={styles.macroBox}>
                    <View style={[styles.macroIconBox, { backgroundColor: "#FFDAB9" }]}>
                        <Entypo name="fire" size={20} color="orange" />
                    </View>
                    <Text style={styles.macroLabel}>Protein</Text>
                    <Text style={styles.macroValue}>85g</Text>
                </View>

                <View style={styles.macroBox}>
                    <View style={[styles.macroIconBox, { backgroundColor: "#D0E7FF" }]}>
                        <Ionicons name="water" size={20} color="blue" />
                    </View>
                    <Text style={styles.macroLabel}>Carbs</Text>
                    <Text style={styles.macroValue}>142g</Text>
                </View>

                <View style={styles.macroBox}>
                    <View style={[styles.macroIconBox, { backgroundColor: "#FFE8A3" }]}>
                        <MaterialIcons name="bolt" size={20} color="gold" />
                    </View>
                    <Text style={styles.macroLabel}>Fats</Text>
                    <Text style={styles.macroValue}>48g</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
    },
    cardHeader: { flexDirection: "row", justifyContent: "space-between" },
    cardTitle: { fontWeight: "600", color: "#222" },
    cardSubtitle: { color: Colors.PRIMARY, fontWeight: "bold", marginTop: 10, textAlign: "center", fontSize: 30 },
    dateText: { color: "#666", fontSize: 13 },

    progressBackground: {
        height: 8,
        backgroundColor: "#E0E0E0",
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 15,
    },
    progressFill: {
        height: "100%",
        width: "67%",
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        opacity:0.5
    },

    macrosRow: { flexDirection: "row", justifyContent: "space-between" },
    macroBox: { alignItems: "center" },
    macroIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4,
    },
    macroLabel: { fontSize: 11, color: "#666" },
    macroValue: { fontWeight: "600", color: "#222" },
});
