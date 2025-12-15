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
        setConsultationType(result.consultationModes.offline ? 'offline' : (result.consultationModes.online ? 'online' : 'offline'));
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
                slot: selectedSlot,
            });
            router.replace(`/consultancy/confirmation/${consultationId}`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    if (!profile) return <Text>Loading...</Text>;

    const available = profile.availableSlots.filter(s => !s.isBooked);

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Select Slot</Text>

            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>Consultation Type</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => setConsultationType('offline')} style={{ marginRight: 10 }}>
                        <Text style={{ color: consultationType === 'offline' ? Colors.PRIMARY : 'gray' }}>Offline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!profile.consultationModes.online} onPress={() => setConsultationType('online')}>
                        <Text style={{ color: consultationType === 'online' ? Colors.PRIMARY : (profile.consultationModes.online ? 'gray' : 'red') }}>
                            {profile.consultationModes.online ? 'Online' : 'Online (Coming Soon)'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {available.length === 0 ? (
                <Text style={{ textAlign: 'center', color: 'gray' }}>No available slots</Text>
            ) : (
                <FlatList
                    data={available}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectSlot(item)} style={{
                            backgroundColor: selectedSlot === item ? Colors.PRIMARY : 'white',
                            padding: 15,
                            marginBottom: 10,
                            borderRadius: 8
                        }}>
                            <Text style={{ color: selectedSlot === item ? 'white' : '#222' }}>{item.date} at {item.time}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, idx) => idx.toString()}
                />
            )}

            <Button title="Confirm Booking" onPress={handleBook} />
        </View>
    );
}
