import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../services/FirebasConfig";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import Colors from "../../shared/Colors";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const convex = useConvex();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    goal: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        gender: user.gender || '',
        goal: user.goal || '',
      });
    }
  }, [user]);

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    router.replace("/auth/SignIn");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        gender: user.gender || '',
        goal: user.goal || '',
      });
    }
  };

  const handleSave = async () => {
    try {
      await convex.mutation(api.Users.UpdateUserProfile, {
        uid: user._id,
        ...form,
      });
      // Update local user context
      setUser({ ...user, ...form });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
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
            {(form.name || "U")[0].toUpperCase()}
          </Text>
        </View>

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={(value) => updateForm('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => updateForm('email', value)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={form.age}
              onChangeText={(value) => updateForm('age', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={form.gender}
              onChangeText={(value) => updateForm('gender', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Goal"
              value={form.goal}
              onChangeText={(value) => updateForm('goal', value)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>{user?.email || "user@email.com"}</Text>
            {user?.gender && <Text style={styles.userDetail}>Gender: {user.gender}</Text>}
            {user?.goal && <Text style={styles.userDetail}>Goal: {user.goal}</Text>}

            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          {isEditing ? (
            <TextInput
              style={styles.statInput}
              placeholder="Weight"
              value={form.weight}
              onChangeText={(value) => updateForm('weight', value)}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.statValue}>{user?.weight || "--"} kg</Text>
          )}
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          {isEditing ? (
            <TextInput
              style={styles.statInput}
              placeholder="Height"
              value={form.height}
              onChangeText={(value) => updateForm('height', value)}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.statValue}>{user?.height || "--"} cm</Text>
          )}
          <Text style={styles.statLabel}>Height</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          {isEditing ? (
            <TextInput
              style={styles.statInput}
              placeholder="Age"
              value={form.age}
              onChangeText={(value) => updateForm('age', value)}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.statValue}>{user?.age || "--"}</Text>
          )}
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
  userDetail: { fontSize: 14, color: "#666", marginBottom: 5 },

  editBtn: {
    borderWidth: 1,
    borderColor: Colors.GREEN,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editText: { color: Colors.GREEN, fontWeight: "600" },

  input: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    fontSize: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },

  saveBtn: {
    backgroundColor: Colors.GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveText: { color: Colors.WHITE, fontWeight: '600' },

  cancelBtn: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelText: { color: Colors.WHITE, fontWeight: '600' },

  statInput: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    fontSize: 14,
    width: 60,
  },

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
