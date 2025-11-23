import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";

export default function Preference() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [gender, setGender] = useState(null);
  const [goal, setGoal] = useState(null);

  const onContinue = () => {
    if(!weight || !height || !gender || !goal) {
      Alert.alert("Missing Fields!","Please fill all the fields");
      return;
    }

  }

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.subtitle}>
        This helps us create your personalized meal plan.
      </Text>

      {/* Weight + Height */}
      <View style={styles.row}>
        <View style={{flex: 1}}>
            <Input placeholder={"e.g 70"} onChangeText={setWeight} label="Weight (kg)"/>
        </View>
        <View style={{flex: 1}}>
            <Input placeholder={"e.g 5.10"} onChangeText={setHeight} label="Height (ft)"/>
        </View>
      </View>

      {/* Gender */}
      <Text style={styles.sectionTitle}>Gender</Text>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.genderBox, gender === "male" && styles.genderSelected]}
          onPress={() => setGender("male")}
        >
          <Text style={styles.genderEmoji}>♂</Text>
          <Text>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.genderBox, gender === "female" && styles.genderSelected]}
          onPress={() => setGender("female")}
        >
          <Text style={styles.genderEmoji}>♀</Text>
          <Text>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.genderBox, gender === "other" && styles.genderSelected]}
          onPress={() => setGender("other")}
        >
          <Text style={styles.genderEmoji}>⚪</Text>
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      {/* Goal */}
      <Text style={styles.sectionTitle}>What's Your Goal?</Text>

      <TouchableOpacity 
        style={[styles.goalCard, goal === "lose" && styles.goalSelected]}
        onPress={() => setGoal("lose")}
      >
        <View style={styles.goalIconRed}/>
        <View>
          <Text style={styles.goalTitle}>Lose Weight</Text>
          <Text style={styles.goalSubtitle}>Trim down and feel lighter</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.goalCard, goal === "gain" && styles.goalSelected]}
        onPress={() => setGoal("gain")}
      >
        <View style={styles.goalIconBlue}/>
        <View>
          <Text style={styles.goalTitle}>Gain Weight</Text>
          <Text style={styles.goalSubtitle}>Build mass healthily</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.goalCard, goal === "muscle" && styles.goalSelected]}
        onPress={() => setGoal("muscle")}
      >
        <View style={styles.goalIconGreen}/>
        <View>
          <Text style={styles.goalTitle}>Build Muscle</Text>
          <Text style={styles.goalSubtitle}>Increase strength and definition</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Button title="Continue" style={{marginTop: 25}} onPress={onContinue} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 30,
    backgroundColor: "#fff",
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  /** FORM **/
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  /** GENDER BOXES **/
  genderBox: {
    width: "32%",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  genderSelected: {
    borderColor: "#6a11cb",
    backgroundColor: "#f3e8ff",
  },
  genderEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },

  /** GOAL CARDS **/
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    gap: 15,
  },
  goalSelected: {
    borderColor: "#6a11cb",
    backgroundColor: "#f3e8ff",
  },
  goalIconRed: {
    width: 30,
    height: 30,
    backgroundColor: "#ef4444",
    borderRadius: 8,
  },
  goalIconBlue: {
    width: 30,
    height: 30,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
  },
  goalIconGreen: {
    width: 30,
    height: 30,
    backgroundColor: "#22c55e",
    borderRadius: 8,
  },

  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  goalSubtitle: {
    fontSize: 13,
    color: "#666",
  },
});
