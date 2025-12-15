import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../../shared/Colors';

export default function ExpertDietPlan() {
    const { consultationId } = useLocalSearchParams();
    const convex = useConvex();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        getPlan();
    }, [consultationId]);

    const getPlan = async () => {
        const result = await convex.query(api.ExpertDietPlans.getExpertDietPlan, {
            consultationId,
        });
        setPlan(result);
    };

    const renderMeal = ({ item }) => (
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
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Protein: {item.macros.protein}g</Text>
            <Text>Carbs: {item.macros.carbs}g</Text>
            <Text>Fat: {item.macros.fat}g</Text>
        </View>
    );

    if (!plan) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Expert Diet Plan</Text>
            {plan.meals.length === 0 ? (
                <Text style={{ textAlign: 'center', color: 'gray' }}>No meals in plan</Text>
            ) : (
                <FlatList
                    data={plan.meals}
                    renderItem={renderMeal}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </ScrollView>
    );
}
