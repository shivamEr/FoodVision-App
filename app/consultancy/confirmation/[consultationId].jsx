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
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: Colors.PRIMARY }}>
                    Booking Confirmed!
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>Nutritionist: {consultation.nutritionist.user.name}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Date: {consultation.slot.date}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Time: {consultation.slot.time}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Type: {consultation.consultationType}</Text>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>Payment: Pay on site</Text>

                <Button title="Fill Pre-Consultation Form" onPress={handleFillForm} />
                <TouchableOpacity onPress={handleViewDetails} style={{ marginTop: 10 }}>
                    <Text style={{ color: Colors.PRIMARY }}>View Consultation Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
