// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import { useRouter } from 'expo-router';
// import { UserContext } from '../../../context/UserContext';
// import Colors from '../../../shared/Colors';

// export default function Dashboard() {
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
//         // First get nutritionist profile
//         const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
//         const nutri = nutritionists.find(n => n.userId === user._id);
//         if (nutri) {
//             const result = await convex.query(api.Consultations.getNutritionistConsultations, {
//                 nutritionistId: nutri._id,
//             });
//             setConsultations(result.filter(c => c.status === 'upcoming'));
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
//             onPress={() => router.push(`/client/${item.user._id}`)}
//         >
//             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.user.name}</Text>
//             <Text>Date: {item.slot.date}</Text>
//             <Text>Time: {item.slot.time}</Text>
//             <Text>Type: {item.consultationType}</Text>
//         </TouchableOpacity>
//     );  

//     return (
//         <View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Upcoming Consultations</Text>
//             {consultations.length === 0 ? (
//                 <Text style={{ textAlign: 'center', color: 'gray' }}>No upcoming consultations</Text>
//             ) : (
//                 <FlatList
//                     data={consultations}
//                     renderItem={renderConsultation}
//                     keyExtractor={(item) => item._id}
//                 />
//             )}
//         </View>
//     );
// }













import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'expo-router';
import { UserContext } from '../../../context/UserContext';
import Colors from '../../../shared/Colors';

export default function Dashboard() {
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
    const nutritionists = await convex.query(
      api.Nutritionists.getAllNutritionists
    );
    const nutri = nutritionists.find(n => n.userId === user._id);

    if (nutri) {
      const result = await convex.query(
        api.Consultations.getNutritionistConsultations,
        { nutritionistId: nutri._id }
      );

      setConsultations(result.filter(c => c.status === 'upcoming'));
    }
  };

  const renderConsultation = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/client/${item.user._id}`)}
    >
      {/* Patient Info */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.user.name?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.patientName}>{item.user.name}</Text>
          <Text style={styles.subText}>
            {item.slot.date} • {item.slot.time}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                item.consultationType === 'online'
                  ? '#E3F2FD'
                  : '#E8F5E9',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  item.consultationType === 'online'
                    ? '#1565C0'
                    : '#2E7D32',
              },
            ]}
          >
            {item.consultationType.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today’s Consultations</Text>
        <Text style={styles.subtitle}>
          Manage your upcoming client sessions
        </Text>
      </View>

      {consultations.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No upcoming consultations scheduled
          </Text>
        </View>
      ) : (
        <FlatList
          data={consultations}
          renderItem={renderConsultation}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
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
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '700',
    color: '#222',
  },

  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  emptyState: {
    marginTop: 60,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
