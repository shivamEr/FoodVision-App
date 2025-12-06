import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../shared/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function GenerateRecipeCard() {
  const router = useRouter();
  return (
    <LinearGradient 
    colors={[Colors.BLUE, Colors.PRIMARY]} 
    style={styles.card}>
      <Text style={styles.label}>Need Meal Ideas?</Text>

      <Text style={styles.desc}>
        Let our AI generate personalized recipes just for you!
      </Text>

      <TouchableOpacity 
      style={styles.button}
      onPress={() => router.push('/generate-ai-recipe')}>
        <Text style={styles.buttonText}>Generate With AI</Text>
        <FontAwesome6 name="angle-right" size={24} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.WHITE,
  },

  desc: {
    marginVertical: 8,
    fontSize: 18,
    color: Colors.WHITE,
    opacity: 0.7,
    lineHeight: 18,
  },

  button: {
    marginTop: 10,
    padding:12,
    backgroundColor: Colors.WHITE,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "55%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  buttonText: {
    color: Colors.PRIMARY,
    fontSize: 18,
  },
});
