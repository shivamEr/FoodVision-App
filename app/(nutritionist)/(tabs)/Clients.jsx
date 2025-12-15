import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';

export default function Clients() {
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        if (user?.role === 'nutritionist') {
            getConsultations();
        }
    }, [user]);

    const getConsultations = async () => {
        const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
        const nutri = nutritionists.find(n => n.userId === user._id);
        if (nutri) {
            const result = await convex.query(api.Consultations.getNutritionistConsultations, {
                nutritionistId: nutri._id,
            });
            // Get unique users
            const uniqueUsers = [];
            const seen = new Set();
            result.forEach(c => {
                if (!seen.has(c.user._id)) {
                    seen.add(c.user._id);
                    uniqueUsers.push(c);
                }
            });
            setConsultations(uniqueUsers);
        }
    };

    const renderClient = ({ item }) => (
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
            onPress={() => router.push(`/client/${item.user._id}`)}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.user.name}</Text>
            <Text>{item.user.email}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>My Clients</Text>
            {consultations.length === 0 ? (
                <Text style={{ textAlign: 'center', color: 'gray' }}>No clients yet</Text>
            ) : (
                <FlatList
                    data={consultations}
                    renderItem={renderClient}
                    keyExtractor={(item) => item.user._id}
                />
            )}
        </View>
    );
}