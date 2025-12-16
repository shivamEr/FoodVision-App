import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function NutritionistProfile() {
    const { nutritionistId } = useLocalSearchParams();
    const convex = useConvex();
    const router = useRouter();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile();
    }, [nutritionistId]);

    const getProfile = async () => {
        const result = await convex.query(api.Nutritionists.getNutritionistProfile, {
            nutritionistId,
        });
        setProfile(result);
    };
    
    const handleBookConsultation = () => {
        router.push(`/consultancy/${nutritionistId}/book`);
    };

    const getNext7Days = () => {
        const dates = [];
        const now = new Date();
        for (let i = 1; i <= 7; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    };

    const next7Days = getNext7Days();

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    const availableSlots = (profile.availableSlots || []).filter(s => !s.isBooked && next7Days.includes(s.date));

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7' }} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', marginBottom: 10 }}>
                <Image
                    source={{ uri: profile.user.picture || 'https://via.placeholder.com/120' }}
                    style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: Colors.PRIMARY }}
                />
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 15, color: '#333' }}>{profile.user.name}</Text>
                <Text style={{ fontSize: 18, color: Colors.PRIMARY, fontWeight: '600' }}>{profile.degree}</Text>
                <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>{profile.experienceYears} years experience</Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>

            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>About</Text>
                <Text style={{ fontSize: 16, lineHeight: 24, color: '#555' }}>{profile.bio}</Text>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>Experience: <Text style={{ fontWeight: 'normal' }}>{profile.experienceYears} years</Text></Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginTop: 5 }}>Philosophy: <Text style={{ fontWeight: 'normal' }}>{profile.dietPhilosophy}</Text></Text>
                    {profile.clinicAddress && <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginTop: 5 }}>Clinic: <Text style={{ fontWeight: 'normal' }}>{profile.clinicAddress}</Text></Text>}
                </View>
            </View>

            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Consultation Modes</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        {profile.consultationModes?.offline ? (
                            <View style={{ backgroundColor: Colors.GREEN, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'white', fontSize: 24 }}>✓</Text>
                            </View>
                        ) : (
                            <View style={{ backgroundColor: '#ddd', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'gray', fontSize: 24 }}>✗</Text>
                            </View>
                        )}
                        <Text style={{ fontSize: 14, color: profile.consultationModes?.offline ? Colors.GREEN : 'gray' }}>Offline</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {profile.consultationModes?.online ? (
                            <View style={{ backgroundColor: Colors.GREEN, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'white', fontSize: 24 }}>✓</Text>
                            </View>
                        ) : (
                            <View style={{ backgroundColor: '#ddd', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'gray', fontSize: 24 }}>✗</Text>
                            </View>
                        )}
                        <Text style={{ fontSize: 14, color: profile.consultationModes?.online ? Colors.GREEN : 'gray' }}>Online</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Available Slots (Next 7 Days)</Text>
                {availableSlots.length === 0 ? (
                    <Text style={{ color: 'gray', fontSize: 16 }}>No available slots at the moment</Text>
                ) : (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {availableSlots.slice(0, 10).map((slot, index) => (
                            <View key={index} style={{ backgroundColor: Colors.SECONDARY, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, margin: 4 }}>
                                <Text style={{ fontSize: 14, color: Colors.PRIMARY }}>{slot.date} {slot.time}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <Button title="Book Consultation" onPress={handleBookConsultation} />
        </View>
    </ScrollView>
    );
}
