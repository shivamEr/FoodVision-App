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
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                    source={{ uri: profile.user.picture || 'https://via.placeholder.com/100' }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{profile.user.name}</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>{profile.degree}</Text>
            </View>

            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>About</Text>
                <Text>{profile.bio}</Text>
                <Text style={{ marginTop: 10 }}>Experience: {profile.experienceYears} years</Text>
                <Text>Diet Philosophy: {profile.dietPhilosophy}</Text>
                {profile.clinicAddress && <Text>Clinic: {profile.clinicAddress}</Text>}
            </View>

            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Consultation Modes</Text>
                {profile.consultationModes?.offline ? (
                    <Text style={{ color: Colors.PRIMARY }}>✓ Offline Consultation Available</Text>
                ) : (
                    <Text style={{ color: 'gray' }}>✗ Offline Consultation</Text>
                )}
                {profile.consultationModes?.online ? (
                    <Text style={{ color: Colors.PRIMARY }}>✓ Online Consultation Available</Text>
                ) : (
                    <Text style={{ color: 'red' }}>Coming Soon</Text>
                )}
            </View>

            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Available Slots (Next 7 Days)</Text>
                {availableSlots.length === 0 ? (
                    <Text style={{ color: 'gray' }}>No available slots</Text>
                ) : (
                    availableSlots.slice(0, 10).map((slot, index) => (
                        <Text key={index}>{slot.date} at {slot.time}</Text>
                    ))
                )}
            </View>

            <Button title="Book Consultation" onPress={handleBookConsultation} />
        </ScrollView>
    );
}
