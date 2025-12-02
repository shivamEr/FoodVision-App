import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Actions() {
    return (
        <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Add Custom Meal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Scan Food</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    actions: { flexDirection: "row", gap: 10, marginVertical: 20 },
    secondaryBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#0D9E71",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    secondaryBtnText: { color: "#0D9E71", fontWeight: "600" },
    primaryBtn: {
        flex: 1,
        backgroundColor: "#0D9E71",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    primaryBtnText: { color: "#fff", fontWeight: "600" },
});
