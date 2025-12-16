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
            marginVertical: 8,
            padding: 20,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>{item.name}</Text>
            <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 }}>Nutrition Facts</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, color: '#555' }}>Calories:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.PRIMARY }}>{item.calories} kcal</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, color: '#555' }}>Protein:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{item.macros.protein}g</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, color: '#555' }}>Carbs:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{item.macros.carbs}g</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: '#555' }}>Fat:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{item.macros.fat}g</Text>
                </View>
            </View>
        </View>
    );

    if (!plan) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7' }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20, paddingBottom: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>Expert Diet Plan</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>Your personalized nutrition plan from your nutritionist</Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                {plan.meals.length === 0 ? (
                    <View style={{ backgroundColor: 'white', padding: 40, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 18 }}>No meals in plan yet</Text>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14, marginTop: 5 }}>Your nutritionist will add meals soon</Text>
                    </View>
                ) : (
                    <FlatList
                        data={plan.meals}
                        renderItem={renderMeal}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </ScrollView>
    );
}
