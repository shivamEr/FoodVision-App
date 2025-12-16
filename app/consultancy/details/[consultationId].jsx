import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function ConsultationDetails() {
    const { consultationId } = useLocalSearchParams();
    const convex = useConvex();
    const router = useRouter();
    const [consultation, setConsultation] = useState(null);

    useEffect(() => {
        getConsultation();
    }, [consultationId]);

    const getConsultation = async () => {
        const result = await convex.query(api.Consultations.getConsultationDetails, {
            consultationId,
        });
        setConsultation(result);
    };

    const handleViewPlan = () => {
        if (consultation.expertDietPlan) {
            router.push(`/consultancy/plan/${consultationId}`);
        }
    };

    if (!consultation) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7' }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20, paddingBottom: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>Consultation Details</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>Track your appointment and access all information</Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Appointment Information</Text>
                    <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Nutritionist: <Text style={{ fontWeight: '600' }}>{consultation.nutritionist.user.name}</Text></Text>
                        <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Date: <Text style={{ fontWeight: '600' }}>{consultation.slot.date}</Text></Text>
                        <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Time: <Text style={{ fontWeight: '600' }}>{consultation.slot.time}</Text></Text>
                        <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Type: <Text style={{ fontWeight: '600' }}>{consultation.consultationType}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#333' }}>Status: <Text style={{ fontWeight: '600', color: consultation.status === 'completed' ? Colors.GREEN : Colors.PRIMARY }}>{consultation.status}</Text></Text>
                    </View>
                    {consultation.meetLink && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.PRIMARY,
                                padding: 15,
                                borderRadius: 10,
                                marginTop: 15,
                                alignItems: 'center',
                            }}
                            onPress={() => Linking.openURL(consultation.meetLink)}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Join Meeting</Text>
                        </TouchableOpacity>
                    )}
                    {consultation.meetLink && (
                        <Text style={{ color: Colors.PRIMARY, marginTop: 10, textAlign: 'center', fontSize: 14 }}>Meet Link: {consultation.meetLink}</Text>
                    )}
                </View>

                {consultation.preConsultationForm && (
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Pre-Consultation Form</Text>
                        <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Goals: <Text style={{ fontWeight: 'normal' }}>{consultation.preConsultationForm.goals}</Text></Text>
                            <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Diet Preference: <Text style={{ fontWeight: 'normal' }}>{consultation.preConsultationForm.dietPreference}</Text></Text>
                            {consultation.preConsultationForm.medicalConditions && (
                                <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Medical Conditions: <Text style={{ fontWeight: 'normal' }}>{consultation.preConsultationForm.medicalConditions}</Text></Text>
                            )}
                            {consultation.preConsultationForm.allergies && (
                                <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>Allergies: <Text style={{ fontWeight: 'normal' }}>{consultation.preConsultationForm.allergies}</Text></Text>
                            )}
                            {consultation.preConsultationForm.currentIssues && (
                                <Text style={{ fontSize: 16, color: '#333' }}>Current Issues: <Text style={{ fontWeight: 'normal' }}>{consultation.preConsultationForm.currentIssues}</Text></Text>
                            )}
                        </View>
                    </View>
                )}

                {consultation.session && (
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Session Notes</Text>
                        <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, lineHeight: 24, color: '#555' }}>{consultation.session.notes}</Text>
                        </View>
                    </View>
                )}

                {consultation.expertDietPlan && (
                    <View style={{ marginBottom: 40 }}>
                        <Button title="View Expert Diet Plan" onPress={handleViewPlan} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
