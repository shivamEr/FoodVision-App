// import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../../convex/_generated/api';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { UserContext } from '../../../../context/UserContext';
// import Colors from '../../../../shared/Colors';
// import Button from '../../../../components/shared/Button';

// export default function StartConsultation() {
//     const { consultationId } = useLocalSearchParams();
//     const { user } = useContext(UserContext);
//     const convex = useConvex();
//     const router = useRouter();
//     const [consultation, setConsultation] = useState(null);
//     const [meetLink, setMeetLink] = useState('');

//     useEffect(() => {
//         if (user?.role !== 'nutritionist') {
//             router.replace('/(tabs)');
//             return;
//         }
//         getConsultation();
//     }, [consultationId, user]);

//     const getConsultation = async () => {
//         const result = await convex.query(api.Consultations.getConsultationDetails, {
//             consultationId,
//         });
//         setConsultation(result);
//         setMeetLink(result.meetLink || '');
//     };

//     const handleStart = async () => {
//         if (consultation.consultationType === 'online' && !meetLink) {
//             Alert.alert('Error', 'Please provide a Meet link for online consultation');
//             return;
//         }
//         try {
//             if (meetLink && meetLink !== consultation.meetLink) {
//                 await convex.mutation(api.Consultations.setConsultationMeetLink, {
//                     consultationId,
//                     meetLink,
//                 });
//             }
//             await convex.mutation(api.Sessions.startSession, {
//                 consultationId,
//             });
//             router.push(`/consultation/${consultationId}/notes`);
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     if (!consultation) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
//             <View style={{
//                 backgroundColor: 'white',
//                 padding: 20,
//                 borderRadius: 10,
//                 alignItems: 'center',
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 5,
//                 elevation: 3,
//             }}>
//                 <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
//                     Start Consultation
//                 </Text>
//                 <Text style={{ fontSize: 18, marginBottom: 5 }}>Client: {consultation.user.name}</Text>
//                 <Text style={{ fontSize: 16, marginBottom: 5 }}>Date: {consultation.slot.date}</Text>
//                 <Text style={{ fontSize: 16, marginBottom: 5 }}>Type: {consultation.consultationType}</Text>
//                 {consultation.consultationType === 'online' && (
//                     <TextInput
//                         style={{
//                             width: '100%',
//                             backgroundColor: '#f0f0f0',
//                             padding: 10,
//                             borderRadius: 5,
//                             marginBottom: 10,
//                             borderWidth: 1,
//                             borderColor: '#ddd',
//                         }}
//                         placeholder="Google Meet Link"
//                         value={meetLink}
//                         onChangeText={setMeetLink}
//                     />
//                 )}

//                 {consultation.preConsultationForm && (
//                     <View style={{ marginBottom: 20 }}>
//                         <Text style={{ fontWeight: 'bold' }}>Pre-Consultation Form:</Text>
//                         <Text>Goals: {consultation.preConsultationForm.goals}</Text>
//                         <Text>Diet: {consultation.preConsultationForm.dietPreference}</Text>
//                     </View>
//                 )}

//                 <Button title="Start Session" onPress={handleStart} />
//             </View>
//         </View>
//     );
// }















import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'nutritionist') {
      router.replace('/(tabs)');
      return;
    }
    getConsultation();
  }, [consultationId, user]);

  const getConsultation = async () => {
    const result = await convex.query(
      api.Consultations.getConsultationDetails,
      { consultationId }
    );
    setConsultation(result);
    setMeetLink(result.meetLink || '');
  };

  const handleStart = async () => {
    // Basic validation for online meetings. Treat the placeholder "coming soon" as missing.
    if (
      consultation.consultationType === 'online' &&
      (!meetLink || meetLink === 'coming soon')
    ) {
      Alert.alert('Missing Link', 'Please provide a valid meeting link.');
      return;
    }

    setLoading(true);
    try {
      if (meetLink && meetLink !== consultation.meetLink) {
        await convex.mutation(
          api.Consultations.setConsultationMeetLink,
          { consultationId, meetLink }
        );
      }

      await convex.mutation(api.Sessions.startSession, { consultationId });
      router.push(`/consultation/${consultationId}/notes`);
    } catch (error) {
      // If session already started, navigate to notes instead of showing an error
      if (error?.message?.includes('Session already started')) {
        router.push(`/consultation/${consultationId}/notes`);
      } else {
        Alert.alert('Error', error.message || String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!consultation) {
    return <Text style={{ marginTop: 40, textAlign: 'center' }}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Patient Header */}
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {consultation.user.name?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.patientName}>{consultation.user.name}</Text>
          <Text style={styles.subtitle}>Scheduled Consultation</Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{consultation.slot.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{consultation.slot.time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mode</Text>
          <Text style={styles.value}>
            {consultation.consultationType.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Online Link */}
      {consultation.consultationType === 'online' && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Online Meeting</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste Google Meet / Zoom link"
            value={meetLink}
            onChangeText={setMeetLink}
          />
        </View>
      )}

      {/* Pre-Consultation Notes */}
      {consultation.preConsultationForm && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pre-Consultation Notes</Text>

          <View style={styles.noteBlock}>
            <Text style={styles.noteLabel}>Health Goals</Text>
            <Text style={styles.noteText}>
              {consultation.preConsultationForm.goals}
            </Text>
          </View>

          <View style={styles.noteBlock}>
            <Text style={styles.noteLabel}>Diet Preference</Text>
            <Text style={styles.noteText}>
              {consultation.preConsultationForm.dietPreference}
            </Text>
          </View>
        </View>
      )}

      {/* Action */}
      <View style={{ marginTop: 10 }}>
        <Button title="Start Consultation Session" onPress={handleStart} loading={loading} />
      </View>
    </ScrollView>
  );
}











const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },

  headerCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  patientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    color: '#666',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },

  input: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },

  noteBlock: {
    marginBottom: 12,
  },

  noteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginBottom: 4,
  },

  noteText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
