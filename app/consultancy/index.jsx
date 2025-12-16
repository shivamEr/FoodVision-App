import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'expo-router';
import Colors from '../../shared/Colors';

export default function ConsultancyHome() {
    const convex = useConvex();
    const router = useRouter();
    const [nutritionists, setNutritionists] = useState([]);

    useEffect(() => {
        getNutritionists();
    }, []);

    const getNutritionists = async () => {
        const result = await convex.query(api.Nutritionists.getAllNutritionists);
        setNutritionists(result);
    };

    const renderNutritionist = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                marginVertical: 8,
                padding: 20,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                borderLeftWidth: 4,
                borderLeftColor: Colors.PRIMARY,
            }}
            onPress={() => router.push(`/consultancy/${item._id}`)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: item.user.picture || 'https://via.placeholder.com/60' }}
                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 2, borderColor: Colors.SECONDARY }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 2 }}>{item.user.name}</Text>
                    <Text style={{ fontSize: 14, color: Colors.PRIMARY, fontWeight: '600', marginBottom: 4 }}>{item.degree}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.experienceYears} years experience</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>Specialization: {item.specialization?.join(', ') || 'General'}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.PRIMARY }}>${item.consultationFee}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>per session</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <View style={{ padding: 20, paddingBottom: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>Find a Nutritionist</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>Connect with expert nutritionists for personalized advice</Text>
            </View>
            {nutritionists.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 18 }}>No nutritionists available at the moment</Text>
                </View>
            ) : (
                <FlatList
                    data={nutritionists}
                    renderItem={renderNutritionist}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}
