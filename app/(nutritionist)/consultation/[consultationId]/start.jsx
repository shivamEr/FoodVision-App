import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../../context/UserContext';
import Colors from '../../../../shared/Colors';
import Button from '../../../../components/shared/Button';

export default function StartConsultation() {
    const { consultationId } = useLocalSearchParams();
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [consultation, setConsultation] = useState(null);
    const [meetLink, setMeetLink] = useState('');

    useEffect(() => {
        if (user?.role !== 'nutritionist') {
            router.replace('/(tabs)');
            return;
        }
        getConsultation();
    }, [consultationId, user]);

    const getConsultation = async () => {
        const result = await convex.query(api.Consultations.getConsultationDetails, {
            consultationId,
        });
        setConsultation(result);
        setMeetLink(result.meetLink || '');
    };

    const handleStart = async () => {
        if (consultation.consultationType === 'online' && !meetLink) {
            Alert.alert('Error', 'Please provide a Meet link for online consultation');
            return;
        }
        try {
            if (meetLink && meetLink !== consultation.meetLink) {
                await convex.mutation(api.Consultations.setConsultationMeetLink, {
                    consultationId,
                    meetLink,
                });
            }
            await convex.mutation(api.Sessions.startSession, {
                consultationId,
            });
            router.push(`/consultation/${consultationId}/notes`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    if (!consultation) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                    Start Consultation
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>Client: {consultation.user.name}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Date: {consultation.slot.date}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Type: {consultation.consultationType}</Text>
                {consultation.consultationType === 'online' && (
                    <TextInput
                        style={{
                            width: '100%',
                            backgroundColor: '#f0f0f0',
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: '#ddd',
                        }}
                        placeholder="Google Meet Link"
                        value={meetLink}
                        onChangeText={setMeetLink}
                    />
                )}

                {consultation.preConsultationForm && (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Pre-Consultation Form:</Text>
                        <Text>Goals: {consultation.preConsultationForm.goals}</Text>
                        <Text>Diet: {consultation.preConsultationForm.dietPreference}</Text>
                    </View>
                )}

                <Button title="Start Session" onPress={handleStart} />
            </View>
        </View>
    );
}