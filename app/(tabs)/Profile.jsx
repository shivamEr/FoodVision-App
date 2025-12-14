import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../services/FirebasConfig";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import Colors from "../../shared/Colors";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    router.replace("/");
  };

  const menuOptions = [
    {
      title: "My Progress",
      icon: <Ionicons name="analytics-outline" size={22} color="#444" />,
      path: '/(tabs)/Progress'
    },
    {
      title: "Explore Recipes",
      icon: <Ionicons name="restaurant-outline" size={22} color="#444" />,
      path: '/(tabs)/Meals'
    },
    {
      title: "AI Recipes",
      icon: <Ionicons name="sparkles-outline" size={22} color="#444" />,
      path: '/generate-ai-recipe'
    },
    {
      title: "Privacy & Security",
      icon: <Feather name="shield" size={22} color="#444" />,
      path: '/(tabs)/Home'
    },
    {
      title: "Help Center",
      icon: <Feather name="help-circle" size={22} color="#444" />,
      path:'/(tabs)/Home'
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cover Photo */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
        }}
        style={styles.cover}
      />

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.name || "U")[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.userName}>{user?.name || "User"}</Text>
        <Text style={styles.userEmail}>{user?.email || "user@email.com"}</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user?.weight || "--"} kg</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user?.height || "--"} cm</Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user?.age || "--"}</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      {/* Subscription */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planTitle}>Premium Plan</Text>
            <Text style={styles.planSub}>Unlimited AI recommendations</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.manageBtn}>
          <Text style={styles.manageText}>Manage Subscription</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menuCard}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            onPress={()=>router.push(item?.path)}
            style={[
              styles.menuItem,
              index !== menuOptions.length - 1 && styles.menuDivider,
            ]}
          >
            {item.icon}
            <Text style={styles.menuText}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logOut}>
        <Ionicons name="log-out-outline" size={22} color="#E63946" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },

  cover: {
    height: 200,
    width: "100%",
  },

  profileCard: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: Colors.WHITE,
    fontSize: 32,
    fontWeight: "700",
  },

  userName: { fontSize: 18, fontWeight: "700", color: "#222" },
  userEmail: { fontSize: 12, color: "#666", marginBottom: 10 },

  editBtn: {
    borderWidth: 1,
    borderColor: Colors.GREEN,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editText: { color: Colors.GREEN, fontWeight: "600" },

  statsCard: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#666" },
  divider: {
    width: 1,
    backgroundColor: "#EEE",
    marginHorizontal: 10,
  },

  planCard: {
    backgroundColor: "#B95FEB",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  planTitle: { color: Colors.WHITE, fontSize: 18, fontWeight: "700" },
  planSub: { color: "#FFF9", fontSize: 12 },

  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeText: { color: Colors.WHITE, fontSize: 10, paddingTop: 10 },

  manageBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  manageText: { color: Colors.WHITE, fontWeight: "600" },

  menuCard: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuText: { flex: 1, fontSize: 15, color: "#222" },

  logoutBtn: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoutText: { color: "#E63946", fontWeight: "600", fontSize: 15 },
});
