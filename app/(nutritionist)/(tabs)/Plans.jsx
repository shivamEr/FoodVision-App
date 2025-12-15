import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';

export default function Plans() {
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        if (user?.role === 'nutritionist') {
            getPlans();
        }
    }, [user]);

    const getPlans = async () => {
        const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
        const nutri = nutritionists.find(n => n.userId === user._id);
        if (nutri) {
            const consultations = await convex.query(api.Consultations.getNutritionistConsultations, {
                nutritionistId: nutri._id,
            });
            const planPromises = consultations.map(async (c) => {
                const plan = await convex.query(api.ExpertDietPlans.getExpertDietPlan, {
                    consultationId: c._id,
                });
                return plan ? { ...plan, consultation: c } : null;
            });
            const results = await Promise.all(planPromises);
            setPlans(results.filter(p => p));
        }
    };

    const renderPlan = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                margin: 10,
                padding: 15,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
            onPress={() => router.push(`/consultation/${item.consultationId}/plan`)}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.consultation.user.name}</Text>
            <Text>Meals: {item.meals.length}</Text>
            <Text>Published: {new Date(item.publishedAt).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Expert Diet Plans</Text>
            {plans.length === 0 ? (
                <Text style={{ textAlign: 'center', color: 'gray' }}>No plans created yet</Text>
            ) : (
                <FlatList
                    data={plans}
                    renderItem={renderPlan}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}