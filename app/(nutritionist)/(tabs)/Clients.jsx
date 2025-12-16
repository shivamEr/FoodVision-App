// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import { useRouter } from 'expo-router';
// import { UserContext } from '../../../context/UserContext';
// import Colors from '../../../shared/Colors';

// export default function Clients() {
//     const { user } = useContext(UserContext);
//     const convex = useConvex();
//     const router = useRouter();
//     const [consultations, setConsultations] = useState([]);

//     useEffect(() => {
//         if (user?.role === 'nutritionist') {
//             getConsultations();
//         }
//     }, [user]);

//     const getConsultations = async () => {
//         const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
//         const nutri = nutritionists.find(n => n.userId === user._id);
//         if (nutri) {
//             const result = await convex.query(api.Consultations.getNutritionistConsultations, {
//                 nutritionistId: nutri._id,
//             });
//             // Get unique users
//             const uniqueUsers = [];
//             const seen = new Set();
//             result.forEach(c => {
//                 if (!seen.has(c.user._id)) {
//                     seen.add(c.user._id);
//                     uniqueUsers.push(c);
//                 }
//             });
//             setConsultations(uniqueUsers);
//         }
//     };

//     const renderClient = ({ item }) => (
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
//             onPress={() => router.push(`/client/${item.user._id}`)}
//         >
//             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.user.name}</Text>
//             <Text>{item.user.email}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>My Clients</Text>
//             {consultations.length === 0 ? (
//                 <Text style={{ textAlign: 'center', color: 'gray' }}>No clients yet</Text>
//             ) : (
//                 <FlatList
//                     data={consultations}
//                     renderItem={renderClient}
//                     keyExtractor={(item) => item.user._id}
//                 />
//             )}
//         </View>
//     );
// }














import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';

export default function Clients() {
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const router = useRouter();
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    if (user?.role === 'nutritionist') {
      getConsultations();
    }
  }, [user]);

  const getConsultations = async () => {
    const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
    const nutri = nutritionists.find(n => n.userId === user._id);
    if (nutri) {
      const result = await convex.query(api.Consultations.getNutritionistConsultations, {
        nutritionistId: nutri._id,
      });

      const uniqueUsers = [];
      const seen = new Set();
      result.forEach(c => {
        if (!seen.has(c.user._id)) {
          seen.add(c.user._id);
          uniqueUsers.push(c);
        }
      });

      setConsultations(uniqueUsers);
    }
  };

  const renderClient = ({ item }) => {
    const initial = item.user.name?.charAt(0)?.toUpperCase();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/client/${item.user._id}`)}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.patientName}>{item.user.name}</Text>
          <Text style={styles.patientEmail}>{item.user.email}</Text>
        </View>

        <Text style={styles.viewText}>View</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Patients</Text>
        <Text style={styles.subtitle}>
          Patients currently under your nutritional care
        </Text>
      </View>

      {/* List */}
      {consultations.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Patients Yet</Text>
          <Text style={styles.emptyText}>
            Once consultations are booked, patients will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={consultations}
          renderItem={renderClient}
          keyExtractor={(item) => item.user._id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  patientEmail: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  viewText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
});
