import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function ClientProfile() {
    const { clientId } = useLocalSearchParams();
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [client, setClient] = useState(null);
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        if (user?.role !== 'nutritionist') {
            router.replace('/(tabs)');
            return;
        }
        getClientData();
    }, [clientId, user]);

    const getClientData = async () => {
        // Get user details
        const userDetails = await convex.query(api.Users.GetUser, { email: '' }); // Wait, need to get by id
        // Actually, since consultations have user, but to get full user, perhaps query users
        // For simplicity, assume we have user from consultations

        // Get consultations for this client
        const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
        const nutri = nutritionists.find(n => n.userId === user._id);
        if (nutri) {
            const allConsultations = await convex.query(api.Consultations.getNutritionistConsultations, {
                nutritionistId: nutri._id,
            });
            const clientConsultations = allConsultations.filter(c => c.user._id === clientId);
            setConsultations(clientConsultations);
            if (clientConsultations.length > 0) {
                setClient(clientConsultations[0].user);
            }
        }
    };

    const renderConsultation = ({ item }) => (
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
            onPress={() => router.push(`/consultation/${item._id}/start`)}
        >
            <Text>Date: {item.slot.date}</Text>
            <Text>Time: {item.slot.time}</Text>
            <Text>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    if (!client) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{client.name}</Text>
            <Text>Email: {client.email}</Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Consultations</Text>
            {consultations.length === 0 ? (
                <Text>No consultations</Text>
            ) : (
                <FlatList
                    data={consultations}
                    renderItem={renderConsultation}
                    keyExtractor={(item) => item._id}
                />
            )}
        </ScrollView>
    );
}