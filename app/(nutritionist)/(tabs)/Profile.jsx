import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';
import Button from '../../../components/shared/Button';

export default function Profile() {
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        phone: '',
        bio: '',
        degree: '',
        dietPhilosophy: '',
        experienceYears: '',
        specialization: [],
        clinicAddress: '',
        consultationModes: { online: false, offline: true },
        languagesSpoken: [],
        consultationFee: '',
        availableSlots: [],
    });

    useEffect(() => {
        if (user?.role !== 'nutritionist') {
            router.replace('/(tabs)');
            return;
        }
        getProfile();
    }, [user]);

    const getProfile = async () => {
        const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
        const nutri = nutritionists.find(n => n.userId === user._id);
        if (nutri) {
            setProfile(nutri);
            setForm({
                phone: nutri.phone || '',
                bio: nutri.bio || '',
                degree: nutri.degree || '',
                dietPhilosophy: nutri.dietPhilosophy || '',
                experienceYears: nutri.experienceYears?.toString() || '',
                specialization: nutri.specialization || [],
                clinicAddress: nutri.clinicAddress || '',
                consultationModes: nutri.consultationModes,
                languagesSpoken: nutri.languagesSpoken || [],
                consultationFee: nutri.consultationFee?.toString() || '',
                availableSlots: nutri.availableSlots,
            });
        } else {
            setIsEditing(true); // New profile
        }
    };

    const handleSave = async () => {
        try {
            if (profile) {
                await convex.mutation(api.Nutritionists.updateNutritionistProfile, {
                    nutritionistId: profile._id,
                    ...form,
                    experienceYears: parseInt(form.experienceYears),
                    consultationFee: parseInt(form.consultationFee),
                });
            } else {
                const { availableSlots, ...createForm } = form;
                await convex.mutation(api.Nutritionists.createNutritionistProfile, {
                    userId: user._id,
                    ...createForm,
                    experienceYears: parseInt(form.experienceYears),
                    consultationFee: parseInt(form.consultationFee),
                });
            }
            Alert.alert('Success', 'Profile saved');
            setIsEditing(false);
            getProfile();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const updateForm = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    if (!profile && !isEditing) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nutritionist Profile</Text>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Text style={{ color: Colors.PRIMARY }}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            {isEditing ? (
                <>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Phone"
                        value={form.phone}
                        onChangeText={(value) => updateForm('phone', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Bio"
                        value={form.bio}
                        onChangeText={(value) => updateForm('bio', value)}
                        multiline
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Degree"
                        value={form.degree}
                        onChangeText={(value) => updateForm('degree', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Diet Philosophy"
                        value={form.dietPhilosophy}
                        onChangeText={(value) => updateForm('dietPhilosophy', value)}
                        multiline
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Experience Years"
                        value={form.experienceYears}
                        onChangeText={(value) => updateForm('experienceYears', value)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Clinic Address"
                        value={form.clinicAddress}
                        onChangeText={(value) => updateForm('clinicAddress', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Specialization (comma separated)"
                        value={form.specialization.join(', ')}
                        onChangeText={(value) => updateForm('specialization', value.split(', ').map(s => s.trim()))}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text>Offline Consultation: </Text>
                        <TouchableOpacity onPress={() => updateForm('consultationModes', { ...form.consultationModes, offline: !form.consultationModes.offline })}>
                            <Text style={{ color: form.consultationModes.offline ? Colors.PRIMARY : 'gray' }}>
                                {form.consultationModes.offline ? '✓' : '✗'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text>Online Consultation: </Text>
                        <TouchableOpacity onPress={() => updateForm('consultationModes', { ...form.consultationModes, online: !form.consultationModes.online })}>
                            <Text style={{ color: form.consultationModes.online ? Colors.PRIMARY : 'gray' }}>
                                {form.consultationModes.online ? '✓' : '✗'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Languages Spoken (comma separated)"
                        value={form.languagesSpoken.join(', ')}
                        onChangeText={(value) => updateForm('languagesSpoken', value.split(', ').map(s => s.trim()))}
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
                        placeholder="Consultation Fee"
                        value={form.consultationFee}
                        onChangeText={(value) => updateForm('consultationFee', value)}
                        keyboardType="numeric"
                    />
                    <Button title="Save Profile" onPress={handleSave} />
                </>
            ) : (
                profile && (
                    <>
                        <Text>Phone: {profile.phone}</Text>
                        <Text>Bio: {profile.bio}</Text>
                        <Text>Degree: {profile.degree}</Text>
                        <Text>Diet Philosophy: {profile.dietPhilosophy}</Text>
                        <Text>Experience: {profile.experienceYears} years</Text>
                        <Text>Specialization: {profile.specialization?.join(', ')}</Text>
                        <Text>Clinic: {profile.clinicAddress}</Text>
                        <Text>Consultation Modes: {profile.consultationModes?.offline ? 'Offline' : ''} {profile.consultationModes?.online ? 'Online' : ''}</Text>
                        <Text>Languages: {profile.languagesSpoken?.join(', ')}</Text>
                        <Text>Fee: ${profile.consultationFee}</Text>
                    </>
                )
            )}
        </ScrollView>
    );
}