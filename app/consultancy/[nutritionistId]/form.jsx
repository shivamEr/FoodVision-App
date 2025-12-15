import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function PreConsultationForm() {
    const { consultationId } = useLocalSearchParams();
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [form, setForm] = useState({
        goals: '',
        medicalConditions: '',
        allergies: '',
        dietPreference: '',
        currentIssues: '',
    });

    const handleSubmit = async () => {
        if (!form.goals || !form.dietPreference) {
            Alert.alert('Error', 'Please fill in required fields');
            return;
        }

        try {
            await convex.mutation(api.PreConsultationForms.savePreConsultationForm, {
                consultationId,
                ...form,
            });
            Alert.alert('Success', 'Form submitted successfully');
            router.back();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const updateForm = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Pre-Consultation Form</Text>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Goals *</Text>
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
                placeholder="What are your goals?"
                value={form.goals}
                onChangeText={(value) => updateForm('goals', value)}
                multiline
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Medical Conditions</Text>
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
                placeholder="Any medical conditions?"
                value={form.medicalConditions}
                onChangeText={(value) => updateForm('medicalConditions', value)}
                multiline
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Allergies</Text>
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
                placeholder="Any allergies?"
                value={form.allergies}
                onChangeText={(value) => updateForm('allergies', value)}
                multiline
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Diet Preference *</Text>
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
                placeholder="e.g., Vegetarian, Vegan, Keto"
                value={form.dietPreference}
                onChangeText={(value) => updateForm('dietPreference', value)}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Current Issues</Text>
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
                placeholder="Any current issues?"
                value={form.currentIssues}
                onChangeText={(value) => updateForm('currentIssues', value)}
                multiline
            />

            <Button title="Submit Form" onPress={handleSubmit} />
        </ScrollView>
    );
}
