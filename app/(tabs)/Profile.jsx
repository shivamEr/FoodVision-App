import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

export default function Profile() {
  const { user } = useContext(UserContext);

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: <Feather name="user" size={20} color="#555" />, label: "Personal Information", badge: null },
        { icon: <Feather name="target" size={20} color="#555" />, label: "Goals & Preferences", badge: null },
        { icon: <Ionicons name="notifications-outline" size={20} color="#555" />, label: "Notifications", badge: "3" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: <Feather name="shield" size={20} color="#555" />, label: "Privacy & Security", badge: null },
        { icon: <Feather name="help-circle" size={20} color="#555" />, label: "Help Center", badge: null },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name || "U")[0].toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>{user?.email || "user@email.com"}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsWrapper}>
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user?.weight || "--"} kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user?.height || "--"} cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user?.age || "--"}</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
        </View>
      </View>

      {/* Current Subscription */}
      <View style={styles.planSection}>
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View>
              <Text style={styles.planTitle}>Premium Plan</Text>
              <Text style={styles.planDescription}>
                Unlimited AI recommendations
              </Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Sections */}
      <View style={styles.menuWrapper}>
        {menuSections.map((section, sIdx) => (
          <View key={section.title} style={{ marginBottom: 20 }}>
            <Text style={styles.menuTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, iIdx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    iIdx < section.items.length - 1 && styles.menuItemDivider,
                  ]}
                >
                  {item.icon}
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <MaterialIcons name="chevron-right" size={22} color="#bbb" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#E63946" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f5f5f5" },

  header: {
    backgroundColor: "#0D9E71",
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 20 },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 55,
    height: 55,
    backgroundColor: "#0FAD80",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "700" },
  userName: { fontSize: 16, fontWeight: "700", color: "#222" },
  userEmail: { fontSize: 12, color: "#555" },
  editButton: { color: "#0D9E71", fontWeight: "600" },

  statsWrapper: { marginTop: -20, paddingHorizontal: 20 },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "#eee",
    marginHorizontal: 10,
  },
  statBox: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "700", color: "#222" },
  statLabel: { fontSize: 12, color: "#666" },

  planSection: { padding: 20 },
  planCard: {
    backgroundColor: "#B95FEB",
    padding: 20,
    borderRadius: 20,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  planTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  planDescription: { color: "#FFF9", fontSize: 12 },
  activeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activeBadgeText: { color: "#fff", fontSize: 10 },
  manageButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  manageButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  menuWrapper: { padding: 20, paddingBottom: 40 },
  menuTitle: { fontWeight: "600", color: "#666", marginBottom: 8, fontSize: 12 },
  menuCard: { backgroundColor: "#fff", borderRadius: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLabel: { flex: 1, color: "#222", fontSize: 14 },
  badge: {
    backgroundColor: "#0D9E71",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 10 },

  logoutBtn: {
    marginTop: 6,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutText: {
    flex: 1,
    color: "#E63946",
    fontWeight: "600",
  },
});
