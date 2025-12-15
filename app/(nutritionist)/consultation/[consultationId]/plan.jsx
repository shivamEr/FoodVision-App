import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../../context/UserContext';
import Colors from '../../../../shared/Colors';
import Button from '../../../../components/shared/Button';

export default function CreateDietPlan() {
    const { consultationId } = useLocalSearchParams();
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [meals, setMeals] = useState([]);
    const [plan, setPlan] = useState(null);

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
        setMeals([...meals, {
            name: '',
            calories: 0,
            macros: { protein: 0, carbs: 0, fat: 0 }
        }]);
    };

    const updateMeal = (index, field, value) => {
        const updated = [...meals];
        if (field === 'name') {
            updated[index][field] = value;
        } else if (field === 'calories') {
            updated[index][field] = parseInt(value);
        } else {
            updated[index].macros[field] = parseInt(value);
        }
        setMeals(updated);
    };

    const removeMeal = (index) => {
        setMeals(meals.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        try {
            const consultation = await convex.query(api.Consultations.getConsultationDetails, { consultationId });
            if (plan) {
                await convex.mutation(api.ExpertDietPlans.updateExpertDietPlan, {
                    planId: plan._id,
                    meals,
                });
            } else {
                await convex.mutation(api.ExpertDietPlans.createExpertDietPlan, {
                    consultationId,
                    userId: consultation.user._id,
                    meals,
                });
            }
            Alert.alert('Success', 'Diet plan saved');
            router.replace('/(nutritionist)/(tabs)/Dashboard');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const renderMeal = ({ item, index }) => (
        <View style={{
            backgroundColor: 'white',
            margin: 10,
            padding: 15,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        }}>
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Meal name"
                value={item.name}
                onChangeText={(value) => updateMeal(index, 'name', value)}
            />
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Calories"
                value={item.calories.toString()}
                onChangeText={(value) => updateMeal(index, 'calories', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Protein (g)"
                value={item.macros.protein.toString()}
                onChangeText={(value) => updateMeal(index, 'protein', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Carbs (g)"
                value={item.macros.carbs.toString()}
                onChangeText={(value) => updateMeal(index, 'carbs', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Fat (g)"
                value={item.macros.fat.toString()}
                onChangeText={(value) => updateMeal(index, 'fat', value)}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => removeMeal(index)}>
                <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                {plan ? 'Edit' : 'Create'} Expert Diet Plan
            </Text>

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: 'center',
                }}
                onPress={addMeal}
            >
                <Text style={{ color: 'white' }}>Add Meal</Text>
            </TouchableOpacity>

            <FlatList
                data={meals}
                renderItem={renderMeal}
                keyExtractor={(item, index) => index.toString()}
            />

            <Button title="Save Plan" onPress={handleSave} />
        </View>
    );
}