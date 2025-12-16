// import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { UserContext } from '../../../context/UserContext';
// import Colors from '../../../shared/Colors';
// import Button from '../../../components/shared/Button';

// export default function ClientProfile() {
//     const { clientId } = useLocalSearchParams();
//     const { user } = useContext(UserContext);
//     const convex = useConvex();
//     const router = useRouter();
//     const [client, setClient] = useState(null);
//     const [consultations, setConsultations] = useState([]);

//     useEffect(() => {
//         if (user?.role !== 'nutritionist') {
//             router.replace('/(tabs)');
//             return;
//         }
//         getClientData();
//     }, [clientId, user]);

//     const getClientData = async () => {
//         // Get user details
//         // const userDetails = await convex.query(api.Users.GetUser, { email: '' }); // Wait, need to get by id
//         // Actually, since consultations have user, but to get full user, perhaps query users
//         // For simplicity, assume we have user from consultations

//         // Get consultations for this client
//         const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
//         const nutri = nutritionists.find(n => n.userId === user._id);
//         if (nutri) {
//             const allConsultations = await convex.query(api.Consultations.getNutritionistConsultations, {
//                 nutritionistId: nutri._id,
//             });
//             const clientConsultations = allConsultations.filter(c => c.user._id === clientId);
//             setConsultations(clientConsultations);
//             if (clientConsultations.length > 0) {
//                 setClient(clientConsultations[0].user);
//             }
//         }
//     };

//     const renderConsultation = ({ item }) => (
//         <TouchableOpacity
//             style={{
//                 backgroundColor: 'white',
//                 margin: 10,
//                 padding: 15,
//                 borderRadius: 10,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 5,
//                 elevation: 3,
//             }}
//             onPress={() => router.push(`/consultation/${item._id}/start`)}
//         >
//             <Text>Date: {item.slot.date}</Text>
//             <Text>Time: {item.slot.time}</Text>
//             <Text>Status: {item.status}</Text>
//         </TouchableOpacity>
//     );

//     if (!client) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{client.name}</Text>
//             <Text>Email: {client.email}</Text>

//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Consultations</Text>
//             {consultations.length === 0 ? (
//                 <Text>No consultations</Text>
//             ) : (
//                 <FlatList
//                     data={consultations}
//                     renderItem={renderConsultation}
//                     keyExtractor={(item) => item._id}
//                 />
//             )}
//         </ScrollView>
//     );
// }























import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';

export default function ClientProfile() {
  const { clientId } = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const router = useRouter();

  const [client, setClient] = useState(null);
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    if (user?.role !== 'nutritionist') {
      router.replace('/(tabs)');
      return;
    }
    getClientData();
  }, [clientId, user]);

  const getClientData = async () => {
    const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
    const nutri = nutritionists.find(n => n.userId === user._id);

    if (nutri) {
      const allConsultations = await convex.query(
        api.Consultations.getNutritionistConsultations,
        { nutritionistId: nutri._id }
      );

      const clientConsultations = allConsultations.filter(
        c => c.user._id === clientId
      );

      setConsultations(clientConsultations);

      if (clientConsultations.length > 0) {
        setClient(clientConsultations[0].user);
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusScheduled;
    }
  };

  const renderConsultation = ({ item }) => (
    <TouchableOpacity
      style={styles.consultationCard}
      onPress={() => router.push(`/consultation/${item._id}/start`)}
    >
      <View style={styles.consultationHeader}>
        <Text style={styles.consultationDate}>
          {item.slot.date}
        </Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.consultationTime}>
        Time: {item.slot.time}
      </Text>

      <Text style={styles.actionText}>View Consultation →</Text>
    </TouchableOpacity>
  );

  if (!client) {
    return <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Patient Header */}
      <View style={styles.patientCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {client.name?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.patientName}>{client.name}</Text>
          <Text style={styles.patientEmail}>{client.email}</Text>
        </View>
      </View>

      {/* Consultation History */}
      <Text style={styles.sectionTitle}>Consultation History</Text>

      {consultations.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Consultations</Text>
          <Text style={styles.emptyText}>
            This patient has not completed any consultations yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={consultations}
          renderItem={renderConsultation}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },

  patientCard: {
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

  patientEmail: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },

  consultationCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  consultationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  consultationDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },

  consultationTime: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
    textTransform: 'capitalize',
  },

  statusScheduled: {
    backgroundColor: '#FFA500',
  },

  statusCompleted: {
    backgroundColor: '#4CAF50',
  },

  statusCancelled: {
    backgroundColor: '#E53935',
  },

  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY,
    marginTop: 10,
  },

  emptyState: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  emptyText: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
});
