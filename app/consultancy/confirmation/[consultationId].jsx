import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function BookingConfirmation() {
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

    const handleFillForm = () => {
        router.push(`/consultancy/${consultation.nutritionistId}/form?consultationId=${consultationId}`);
    };

    const handleViewDetails = () => {
        router.push(`/consultancy/details/${consultationId}`);
    };

    if (!consultation) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{
                backgroundColor: 'white',
                padding: 30,
                borderRadius: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 8,
                width: '100%',
                maxWidth: 400
            }}>
                <View style={{ backgroundColor: Colors.GREEN, width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontSize: 40 }}>✓</Text>
                </View>
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: Colors.GREEN }}>
                    Booking Confirmed!
                </Text>
                <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 20 }}>
                    Your consultation has been successfully scheduled
                </Text>
                <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, width: '100%', marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>Appointment Details</Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Nutritionist: {consultation.nutritionist.user.name}</Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Date: {consultation.slot.date}</Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Time: {consultation.slot.time}</Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Type: {consultation.consultationType}</Text>
                    <Text style={{ fontSize: 16, color: Colors.PRIMARY }}>Payment: Pay on site</Text>
                </View>

                <Button title="Fill Pre-Consultation Form" onPress={handleFillForm} />
                <TouchableOpacity onPress={handleViewDetails} style={{ marginTop: 15 }}>
                    <Text style={{ color: Colors.PRIMARY, fontSize: 16, fontWeight: '600' }}>View Full Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
