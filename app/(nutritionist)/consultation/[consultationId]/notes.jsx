import { View, Text, TextInput, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../../context/UserContext';
import Colors from '../../../../shared/Colors';
import Button from '../../../../components/shared/Button';

export default function SessionNotes() {
    const { consultationId } = useLocalSearchParams();
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const [notes, setNotes] = useState('');
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (user?.role !== 'nutritionist') {
            router.replace('/(tabs)');
            return;
        }
        getSession();
    }, [consultationId, user]);

    const getSession = async () => {
        const result = await convex.query(api.Sessions.getSession, {
            consultationId,
        });
        setSession(result);
        if (result?.notes) {
            setNotes(result.notes);
        }
    };

    const handleSave = async () => {
        if (!session) return;
        try {
            await convex.mutation(api.Sessions.saveSessionNotes, {
                sessionId: session._id,
                notes,
            });
            Alert.alert('Success', 'Notes saved and session completed');
            // router.back();
            // Instead of back, go to plan creation
            router.push(`/consultation/${consultationId}/plan`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Session Notes</Text>

            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 10,
                    height: 200,
                    textAlignVertical: 'top',
                }}
                placeholder="Enter session notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
            />

            <Button title="Save Notes & Complete Session" onPress={handleSave} />
        </View>
    );
}