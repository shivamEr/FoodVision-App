import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

export default function Header({ name }) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greetingText}>Good Morning,</Text>
                <Text style={styles.userNameText}>{name || "User"}</Text>
            </View>

            <TouchableOpacity style={styles.bellButton}>
                <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.BLUE,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    greetingText: { color: "#D1FFE6", fontSize: 14 },
    userNameText: { color: "#fff", fontSize: 22, fontWeight: "700" },
    bellButton: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
