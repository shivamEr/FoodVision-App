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
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Consultation Details</Text>

            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Appointment</Text>
                <Text>Nutritionist: {consultation.nutritionist.user.name}</Text>
                <Text>Date: {consultation.slot.date}</Text>
                <Text>Time: {consultation.slot.time}</Text>
                <Text>Type: {consultation.consultationType}</Text>
                <Text>Status: {consultation.status}</Text>
                {consultation.meetLink && (
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => Linking.openURL(consultation.meetLink)}
                    >
                        <Text style={{ color: 'white' }}>Join Meeting</Text>
                    </TouchableOpacity>
                )}
                {consultation.meetLink && (
                    <Text style={{ color: Colors.PRIMARY, marginTop: 8 }}>Meet Link: {consultation.meetLink}</Text>
                )}
            </View>

            {consultation.preConsultationForm && (
                <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Pre-Consultation Form</Text>
                    <Text>Goals: {consultation.preConsultationForm.goals}</Text>
                    <Text>Diet Preference: {consultation.preConsultationForm.dietPreference}</Text>
                    {consultation.preConsultationForm.medicalConditions && (
                        <Text>Medical Conditions: {consultation.preConsultationForm.medicalConditions}</Text>
                    )}
                    {consultation.preConsultationForm.allergies && (
                        <Text>Allergies: {consultation.preConsultationForm.allergies}</Text>
                    )}
                    {consultation.preConsultationForm.currentIssues && (
                        <Text>Current Issues: {consultation.preConsultationForm.currentIssues}</Text>
                    )}
                </View>
            )}

            {consultation.session && (
                <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Session Notes</Text>
                    <Text>{consultation.session.notes}</Text>
                </View>
            )}

            {consultation.expertDietPlan && (
                <Button title="View Expert Diet Plan" onPress={handleViewPlan} />
            )}
        </ScrollView>
    );
}
