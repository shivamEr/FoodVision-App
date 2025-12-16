import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function BookConsultation() {
    const { nutritionistId } = useLocalSearchParams();
    const convex = useConvex();
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [consultationType, setConsultationType] = useState('offline');

    useEffect(() => {
        getProfile();
    }, [nutritionistId]);

    const getProfile = async () => {
        const result = await convex.query(api.Nutritionists.getNutritionistProfile, { nutritionistId });
        setProfile(result);
        setConsultationType(result.consultationModes?.offline ? 'offline' : (result.consultationModes?.online ? 'online' : 'offline'));
    };

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBook = async () => {
        if (!selectedSlot) {
            Alert.alert('Select a slot');
            return;
        }
        try {
            const consultationId = await convex.mutation(api.Consultations.createConsultation, {
                userId: user._id,
                nutritionistId,
                consultationType,
                slot: {
                    date: selectedSlot.date,
                    time: selectedSlot.time
                },
            });
            router.replace(`/consultancy/confirmation/${consultationId}`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
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

    if (!profile) return <Text>Loading...</Text>;

    const next7Days = getNext7Days();
    const available = (profile.availableSlots || []).filter(s => !s.isBooked && next7Days.includes(s.date));

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <View style={{ padding: 20, paddingBottom: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>Select Your Slot</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>Choose a convenient time for your consultation</Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Consultation Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => setConsultationType('offline')} style={{ alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: consultationType === 'offline' ? Colors.PRIMARY : '#f0f0f0' }}>
                            <Text style={{ color: consultationType === 'offline' ? 'white' : '#333', fontWeight: '600' }}>Offline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={!profile.consultationModes?.online} onPress={() => setConsultationType('online')} style={{ alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: consultationType === 'online' ? Colors.PRIMARY : (profile.consultationModes?.online ? '#f0f0f0' : '#e0e0e0') }}>
                            <Text style={{ color: consultationType === 'online' ? 'white' : (profile.consultationModes?.online ? '#333' : 'red'), fontWeight: '600' }}>
                                {profile.consultationModes?.online ? 'Online' : 'Coming Soon'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginVertical:10 }}>
                    <Button title="Confirm Booking" onPress={handleBook} />
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>Available Slots</Text>
                {available.length === 0 ? (
                    <View style={{ backgroundColor: 'white', padding: 40, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>No available slots at the moment</Text>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14, marginTop: 5 }}>Please check back later</Text>
                    </View>
                ) : (
                    <FlatList
                        data={available}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectSlot(item)} style={{
                                backgroundColor: selectedSlot === item ? Colors.PRIMARY : 'white',
                                padding: 15,
                                margin: 5,
                                borderRadius: 12,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                                elevation: 3,
                                borderWidth: selectedSlot === item ? 2 : 0,
                                borderColor: Colors.PRIMARY,
                                flex: 1,
                                minWidth: 100,
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: selectedSlot === item ? 'white' : '#333', fontSize: 14, fontWeight: '600' }}>{item.date}</Text>
                                <Text style={{ color: selectedSlot === item ? 'white' : '#666', fontSize: 12 }}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, idx) => idx.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        numColumns={3}
                    />
                )}

                
            </View>
        </View>
    );
}
