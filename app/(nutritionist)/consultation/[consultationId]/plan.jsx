// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../../convex/_generated/api';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { UserContext } from '../../../../context/UserContext';
// import Colors from '../../../../shared/Colors';
// import Button from '../../../../components/shared/Button';

// export default function CreateDietPlan() {
//     const { consultationId } = useLocalSearchParams();
//     const { user } = useContext(UserContext);
//     const convex = useConvex();
//     const router = useRouter();
//     const [meals, setMeals] = useState([]);
//     const [plan, setPlan] = useState(null);

//     useEffect(() => {
//         if (user?.role !== 'nutritionist') {
//             router.replace('/(tabs)');
//             return;
//         }
//         getPlan();
//     }, [consultationId, user]);

//     const getPlan = async () => {
//         const result = await convex.query(api.ExpertDietPlans.getExpertDietPlan, {
//             consultationId,
//         });
//         if (result) {
//             setPlan(result);
//             setMeals(result.meals);
//         }
//     };

//     const addMeal = () => {
//         setMeals([...meals, {
//             name: '',
//             calories: 0,
//             macros: { protein: 0, carbs: 0, fat: 0 }
//         }]);
//     };

//     const updateMeal = (index, field, value) => {
//         const updated = [...meals];
//         if (field === 'name') {
//             updated[index][field] = value;
//         } else if (field === 'calories') {
//             updated[index][field] = parseInt(value);
//         } else {
//             updated[index].macros[field] = parseInt(value);
//         }
//         setMeals(updated);
//     };

//     const removeMeal = (index) => {
//         setMeals(meals.filter((_, i) => i !== index));
//     };

//     const handleSave = async () => {
//         try {
//             const consultation = await convex.query(api.Consultations.getConsultationDetails, { consultationId });
//             if (plan) {
//                 await convex.mutation(api.ExpertDietPlans.updateExpertDietPlan, {
//                     planId: plan._id,
//                     meals,
//                 });
//             } else {
//                 await convex.mutation(api.ExpertDietPlans.createExpertDietPlan, {
//                     consultationId,
//                     userId: consultation.user._id,
//                     meals,
//                 });
//             }
//             Alert.alert('Success', 'Diet plan saved');
//             router.replace('/(nutritionist)/(tabs)/Dashboard');
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     const renderMeal = ({ item, index }) => (
//         <View style={{
//             backgroundColor: 'white',
//             margin: 10,
//             padding: 15,
//             borderRadius: 10,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 5,
//             elevation: 3,
//         }}>
//             <TextInput
//                 style={{ borderBottomWidth: 1, marginBottom: 10 }}
//                 placeholder="Meal name"
//                 value={item.name}
//                 onChangeText={(value) => updateMeal(index, 'name', value)}
//             />
//             <TextInput
//                 style={{ borderBottomWidth: 1, marginBottom: 10 }}
//                 placeholder="Calories"
//                 value={item.calories.toString()}
//                 onChangeText={(value) => updateMeal(index, 'calories', value)}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={{ borderBottomWidth: 1, marginBottom: 10 }}
//                 placeholder="Protein (g)"
//                 value={item.macros.protein.toString()}
//                 onChangeText={(value) => updateMeal(index, 'protein', value)}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={{ borderBottomWidth: 1, marginBottom: 10 }}
//                 placeholder="Carbs (g)"
//                 value={item.macros.carbs.toString()}
//                 onChangeText={(value) => updateMeal(index, 'carbs', value)}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={{ borderBottomWidth: 1, marginBottom: 10 }}
//                 placeholder="Fat (g)"
//                 value={item.macros.fat.toString()}
//                 onChangeText={(value) => updateMeal(index, 'fat', value)}
//                 keyboardType="numeric"
//             />
//             <TouchableOpacity onPress={() => removeMeal(index)}>
//                 <Text style={{ color: 'red' }}>Remove</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
//                 {plan ? 'Edit' : 'Create'} Expert Diet Plan
//             </Text>

//             <TouchableOpacity
//                 style={{
//                     backgroundColor: Colors.PRIMARY,
//                     padding: 10,
//                     borderRadius: 5,
//                     marginBottom: 20,
//                     alignItems: 'center',
//                 }}
//                 onPress={addMeal}
//             >
//                 <Text style={{ color: 'white' }}>Add Meal</Text>
//             </TouchableOpacity>

//             <FlatList
//                 data={meals}
//                 renderItem={renderMeal}
//                 keyExtractor={(item, index) => index.toString()}
//             />

//             <Button title="Save Plan" onPress={handleSave} />
//         </View>
//     );
// }


















import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../../context/UserContext';
import Colors from '../../../../shared/Colors';
import Button from '../../../../components/shared/Button';

export default function CreateDietPlan() {
  const params = useLocalSearchParams();
  const consultationId = Array.isArray(params.consultationId)
    ? params.consultationId[0]
    : params.consultationId;

  const { user } = useContext(UserContext);
  const convex = useConvex();
  const router = useRouter();

  const [meals, setMeals] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'nutritionist') {
      router.replace('/(tabs)');
      return;
    }
    getPlan();
  }, [consultationId, user]);

  const getPlan = async () => {
    const result = await convex.query(api.ExpertDietPlans.getExpertDietPlan, {
      consultationId,
    });
    if (result) {
      setPlan(result);
      setMeals(result.meals);
    }
  };

  const addMeal = () => {
    setMeals([
      ...meals,
      {
        name: '',
        calories: '',
        macros: { protein: '', carbs: '', fat: '' },
      },
    ]);
  };

  const updateMeal = (index, field, value) => {
    const updated = [...meals];
    if (field === 'name' || field === 'calories') {
      updated[index][field] = value;
    } else {
      updated[index].macros[field] = value;
    }
    setMeals(updated);
  };

  const removeMeal = index => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    // Ensure numeric fields are numbers — Convex expects floats for calories/macros
    const normalizedMeals = meals.map((m, idx) => {
      const calories = parseFloat(m.calories);
      const protein = parseFloat(m.macros?.protein);
      const carbs = parseFloat(m.macros?.carbs);
      const fat = parseFloat(m.macros?.fat);

      if (Number.isNaN(calories) || Number.isNaN(protein) || Number.isNaN(carbs) || Number.isNaN(fat)) {
        throw new Error(
          `Invalid numeric value in meal ${idx + 1}. Please enter numbers for calories and macros.`
        );
      }

      return {
        name: m.name || '',
        calories,
        macros: {
          protein,
          carbs,
          fat,
        },
      };
    });

    setLoading(true);
    try {
      const consultation = await convex.query(
        api.Consultations.getConsultationDetails,
        { consultationId }
      );

      if (plan) {
        await convex.mutation(api.ExpertDietPlans.updateExpertDietPlan, {
          planId: plan._id,
          meals: normalizedMeals,
        });
      } else {
        await convex.mutation(api.ExpertDietPlans.createExpertDietPlan, {
          consultationId,
          userId: consultation.user._id,
          meals: normalizedMeals,
        });
      }

      Alert.alert('Success', 'Diet plan saved successfully');
      router.replace('/(nutritionist)/(tabs)/Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  const renderMeal = ({ item, index }) => (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealTitle}>Meal {index + 1}</Text>
        <TouchableOpacity onPress={() => removeMeal(index)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Meal name (e.g., Breakfast)"
        value={item.name}
        onChangeText={v => updateMeal(index, 'name', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories (kcal)"
        value={item.calories}
        onChangeText={v => updateMeal(index, 'calories', v)}
        keyboardType="numeric"
      />

      <Text style={styles.macroTitle}>Macronutrients (grams)</Text>

      <View style={styles.macroRow}>
        <TextInput
          style={styles.macroInput}
          placeholder="Protein"
          value={item.macros.protein}
          onChangeText={v => updateMeal(index, 'protein', v)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.macroInput}
          placeholder="Carbs"
          value={item.macros.carbs}
          onChangeText={v => updateMeal(index, 'carbs', v)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.macroInput}
          placeholder="Fat"
          value={item.macros.fat}
          onChangeText={v => updateMeal(index, 'fat', v)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>
          {plan ? 'Edit' : 'Create'} Expert Diet Prescription
        </Text>
        <Text style={styles.subtitle}>
          Structured meal plan prescribed by nutritionist
        </Text>
      </View>

      <TouchableOpacity style={styles.addMealBtn} onPress={addMeal}>
        <Text style={styles.addMealText}>＋ Add Meal</Text>
      </TouchableOpacity>

      <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Diet Plan" onPress={handleSave} loading={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },

  headerCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  addMealBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  addMealText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },

  mealCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  mealTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  removeText: {
    color: '#D9534F',
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },

  macroTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: 8,
  },

  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  macroInput: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 10,
    width: '32%',
    textAlign: 'center',
  },
});
