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
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7' }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20, paddingBottom: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>Pre-Consultation Form</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>Help your nutritionist prepare better by sharing your details</Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Your Information</Text>

                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>Goals <Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 15,
                            borderWidth: 1,
                            borderColor: '#e9ecef',
                            fontSize: 16
                        }}
                        placeholder="What are your health and fitness goals?"
                        value={form.goals}
                        onChangeText={(value) => updateForm('goals', value)}
                        multiline
                        numberOfLines={3}
                    />

                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>Medical Conditions</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 15,
                            borderWidth: 1,
                            borderColor: '#e9ecef',
                            fontSize: 16
                        }}
                        placeholder="Any existing medical conditions?"
                        value={form.medicalConditions}
                        onChangeText={(value) => updateForm('medicalConditions', value)}
                        multiline
                        numberOfLines={2}
                    />

                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>Allergies</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 15,
                            borderWidth: 1,
                            borderColor: '#e9ecef',
                            fontSize: 16
                        }}
                        placeholder="Any food or medication allergies?"
                        value={form.allergies}
                        onChangeText={(value) => updateForm('allergies', value)}
                        multiline
                        numberOfLines={2}
                    />

                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>Diet Preference <Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 15,
                            borderWidth: 1,
                            borderColor: '#e9ecef',
                            fontSize: 16
                        }}
                        placeholder="e.g., Vegetarian, Vegan, Keto, Mediterranean"
                        value={form.dietPreference}
                        onChangeText={(value) => updateForm('dietPreference', value)}
                    />

                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>Current Issues</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            borderColor: '#e9ecef',
                            fontSize: 16
                        }}
                        placeholder="Any current health concerns or challenges?"
                        value={form.currentIssues}
                        onChangeText={(value) => updateForm('currentIssues', value)}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={{ marginBottom: 40 }}>
                    <Button title="Submit Form" onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
}
