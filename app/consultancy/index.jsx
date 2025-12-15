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
                margin: 10,
                padding: 15,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
            onPress={() => router.push(`/consultancy/${item._id}`)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: item.user.picture || 'https://via.placeholder.com/50' }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.user.name}</Text>
                    <Text style={{ color: 'gray' }}>{item.degree}</Text>
                    <Text style={{ color: 'gray' }}>{item.experienceYears} years experience</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Find a Nutritionist</Text>
            {nutritionists.length === 0 ? (
                <Text style={{ textAlign: 'center', color: 'gray' }}>No nutritionists available</Text>
            ) : (
                <FlatList
                    data={nutritionists}
                    renderItem={renderNutritionist}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}
