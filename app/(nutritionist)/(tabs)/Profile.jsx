// import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState, useContext } from 'react';
// import { useConvex } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import { useRouter } from 'expo-router';
// import { UserContext } from '../../../context/UserContext';
// import Colors from '../../../shared/Colors';
// import Button from '../../../components/shared/Button';

// export default function Profile() {
//     const { user } = useContext(UserContext);
//     const convex = useConvex();
//     const router = useRouter();
//     const [profile, setProfile] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [form, setForm] = useState({
//         phone: '',
//         bio: '',
//         degree: '',
//         dietPhilosophy: '',
//         experienceYears: '',
//         specialization: [],
//         clinicAddress: '',
//         consultationModes: { online: false, offline: true },
//         languagesSpoken: [],
//         consultationFee: '',
//         availableSlots: [],
//     });

//     useEffect(() => {
//         if (user?.role !== 'nutritionist') {
//             router.replace('/(tabs)');
//             return;
//         }
//         getProfile();
//     }, [user]);

//     const getProfile = async () => {
//         const nutritionists = await convex.query(api.Nutritionists.getAllNutritionists);
//         const nutri = nutritionists.find(n => n.userId === user._id);
//         if (nutri) {
//             setProfile(nutri);
//             setForm({
//                 phone: nutri.phone || '',
//                 bio: nutri.bio || '',
//                 degree: nutri.degree || '',
//                 dietPhilosophy: nutri.dietPhilosophy || '',
//                 experienceYears: nutri.experienceYears?.toString() || '',
//                 specialization: nutri.specialization || [],
//                 clinicAddress: nutri.clinicAddress || '',
//                 consultationModes: nutri.consultationModes,
//                 languagesSpoken: nutri.languagesSpoken || [],
//                 consultationFee: nutri.consultationFee?.toString() || '',
//                 availableSlots: nutri.availableSlots,
//             });
//         } else {
//             setIsEditing(true); // New profile
//         }
//     };

//     const handleSave = async () => {
//         try {
//             if (profile) {
//                 await convex.mutation(api.Nutritionists.updateNutritionistProfile, {
//                     nutritionistId: profile._id,
//                     ...form,
//                     experienceYears: parseInt(form.experienceYears),
//                     consultationFee: parseInt(form.consultationFee),
//                 });
//             } else {
//                 const { availableSlots, ...createForm } = form;
//                 await convex.mutation(api.Nutritionists.createNutritionistProfile, {
//                     userId: user._id,
//                     ...createForm,
//                     experienceYears: parseInt(form.experienceYears),
//                     consultationFee: parseInt(form.consultationFee),
//                 });
//             }
//             Alert.alert('Success', 'Profile saved');
//             setIsEditing(false);
//             getProfile();
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     const updateForm = (field, value) => {
//         setForm({ ...form, [field]: value });
//     };

//     if (!profile && !isEditing) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 20 }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//                 <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nutritionist Profile</Text>
//                 <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
//                     <Text style={{ color: Colors.PRIMARY }}>{isEditing ? 'Cancel' : 'Edit'}</Text>
//                 </TouchableOpacity>
//             </View>

//             {isEditing ? (
//                 <>
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Phone"
//                         value={form.phone}
//                         onChangeText={(value) => updateForm('phone', value)}
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Bio"
//                         value={form.bio}
//                         onChangeText={(value) => updateForm('bio', value)}
//                         multiline
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Degree"
//                         value={form.degree}
//                         onChangeText={(value) => updateForm('degree', value)}
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Diet Philosophy"
//                         value={form.dietPhilosophy}
//                         onChangeText={(value) => updateForm('dietPhilosophy', value)}
//                         multiline
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Experience Years"
//                         value={form.experienceYears}
//                         onChangeText={(value) => updateForm('experienceYears', value)}
//                         keyboardType="numeric"
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Clinic Address"
//                         value={form.clinicAddress}
//                         onChangeText={(value) => updateForm('clinicAddress', value)}
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Specialization (comma separated)"
//                         value={form.specialization.join(', ')}
//                         onChangeText={(value) => updateForm('specialization', value.split(', ').map(s => s.trim()))}
//                     />
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                         <Text>Offline Consultation: </Text>
//                         <TouchableOpacity onPress={() => updateForm('consultationModes', { ...form.consultationModes, offline: !form.consultationModes.offline })}>
//                             <Text style={{ color: form.consultationModes.offline ? Colors.PRIMARY : 'gray' }}>
//                                 {form.consultationModes.offline ? '✓' : '✗'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                         <Text>Online Consultation: </Text>
//                         <TouchableOpacity onPress={() => updateForm('consultationModes', { ...form.consultationModes, online: !form.consultationModes.online })}>
//                             <Text style={{ color: form.consultationModes.online ? Colors.PRIMARY : 'gray' }}>
//                                 {form.consultationModes.online ? '✓' : '✗'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Languages Spoken (comma separated)"
//                         value={form.languagesSpoken.join(', ')}
//                         onChangeText={(value) => updateForm('languagesSpoken', value.split(', ').map(s => s.trim()))}
//                     />
//                     <TextInput
//                         style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 }}
//                         placeholder="Consultation Fee"
//                         value={form.consultationFee}
//                         onChangeText={(value) => updateForm('consultationFee', value)}
//                         keyboardType="numeric"
//                     />
//                     <Button title="Save Profile" onPress={handleSave} />
//                 </>
//             ) : (
//                 profile && (
//                     <>
//                         <Text>Phone: {profile.phone}</Text>
//                         <Text>Bio: {profile.bio}</Text>
//                         <Text>Degree: {profile.degree}</Text>
//                         <Text>Diet Philosophy: {profile.dietPhilosophy}</Text>
//                         <Text>Experience: {profile.experienceYears} years</Text>
//                         <Text>Specialization: {profile.specialization?.join(', ')}</Text>
//                         <Text>Clinic: {profile.clinicAddress}</Text>
//                         <Text>Consultation Modes: {profile.consultationModes?.offline ? 'Offline' : ''} {profile.consultationModes?.online ? 'Online' : ''}</Text>
//                         <Text>Languages: {profile.languagesSpoken?.join(', ')}</Text>
//                         <Text>Fee: ${profile.consultationFee}</Text>
//                     </>
//                 )
//             )}
//         </ScrollView>
//     );
// }



















import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
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
      });
    } else {
      setIsEditing(true);
    }
  };

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    try {
      await convex.mutation(
        profile
          ? api.Nutritionists.updateNutritionistProfile
          : api.Nutritionists.createNutritionistProfile,
        {
          ...(profile && { nutritionistId: profile._id }),
          userId: user._id,
          ...form,
          experienceYears: Number(form.experienceYears),
          consultationFee: Number(form.consultationFee),
        }
      );

      Alert.alert('Success', 'Profile saved successfully');
      setIsEditing(false);
      getProfile();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderChips = (items = []) => (
    <View style={styles.chipContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.chip}>
          <Text style={styles.chipText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>Nutritionist Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Editable Form */}
      {isEditing ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={form.phone} onChangeText={v => updateForm('phone', v)} />

          <Text style={styles.label}>Bio</Text>
          <TextInput style={[styles.input, styles.multiline]} multiline value={form.bio} onChangeText={v => updateForm('bio', v)} />

          <Text style={styles.sectionTitle}>Professional Details</Text>

          <Text style={styles.label}>Degree</Text>
          <TextInput style={styles.input} value={form.degree} onChangeText={v => updateForm('degree', v)} />

          <Text style={styles.label}>Diet Philosophy</Text>
          <TextInput style={[styles.input, styles.multiline]} multiline value={form.dietPhilosophy} onChangeText={v => updateForm('dietPhilosophy', v)} />

          <Text style={styles.label}>Experience (Years)</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.experienceYears} onChangeText={v => updateForm('experienceYears', v)} />

          <Text style={styles.label}>Clinic Address</Text>
          <TextInput style={styles.input} value={form.clinicAddress} onChangeText={v => updateForm('clinicAddress', v)} />

          <Text style={styles.label}>Specializations</Text>
          <TextInput
            style={styles.input}
            value={form.specialization.join(', ')}
            onChangeText={v => updateForm('specialization', v.split(',').map(s => s.trim()))}
          />

          <Text style={styles.sectionTitle}>Consultation</Text>

          <View style={styles.switchRow}>
            <Text>Offline Consultation</Text>
            <Switch
              value={form.consultationModes.offline}
              onValueChange={v => updateForm('consultationModes', { ...form.consultationModes, offline: v })}
            />
          </View>

          <View style={styles.switchRow}>
            <Text>Online Consultation</Text>
            <Switch
              value={form.consultationModes.online}
              onValueChange={v => updateForm('consultationModes', { ...form.consultationModes, online: v })}
            />
          </View>

          <Text style={styles.label}>Languages Spoken</Text>
          <TextInput
            style={styles.input}
            value={form.languagesSpoken.join(', ')}
            onChangeText={v => updateForm('languagesSpoken', v.split(',').map(s => s.trim()))}
          />

          <Text style={styles.label}>Consultation Fee</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.consultationFee} onChangeText={v => updateForm('consultationFee', v)} />

          <Button title="Save Profile" onPress={handleSave} />
        </View>
      ) : (
        // profile && (
        //   <View style={styles.card}>
        //     <Text style={styles.profileItem}><Text style={styles.bold}>Phone:</Text> {profile.phone}</Text>
        //     <Text style={styles.profileItem}><Text style={styles.bold}>Bio:</Text> {profile.bio}</Text>
        //     <Text style={styles.profileItem}><Text style={styles.bold}>Degree:</Text> {profile.degree}</Text>
        //     <Text style={styles.profileItem}><Text style={styles.bold}>Experience:</Text> {profile.experienceYears} years</Text>

        //     <Text style={styles.sectionTitle}>Specializations</Text>
        //     {renderChips(profile.specialization)}

        //     <Text style={styles.sectionTitle}>Languages</Text>
        //     {renderChips(profile.languagesSpoken)}

        //     <Text style={styles.profileItem}>
        //       <Text style={styles.bold}>Fee:</Text> ₹{profile.consultationFee}
        //     </Text>
        //   </View>
        // )


        profile && (
  <View style={styles.card}>

    {/* Doctor Header */}
    <View style={styles.doctorHeader}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Dr</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>Certified Nutritionist</Text>
        <Text style={styles.doctorDegree}>{profile.degree}</Text>
      </View>
    </View>

    {/* Experience + Fee Row */}
    <View style={styles.infoRow}>
      <View style={styles.infoBox}>
        <Text style={styles.infoValue}>{profile.experienceYears}+</Text>
        <Text style={styles.infoLabel}>Years Experience</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoValue}>₹{profile.consultationFee}</Text>
        <Text style={styles.infoLabel}>Consultation Fee</Text>
      </View>
    </View>

    {/* Bio */}
    <Text style={styles.sectionTitle}>About Doctor</Text>
    <Text style={styles.profileText}>{profile.bio}</Text>

    {/* Specializations */}
    <Text style={styles.sectionTitle}>Areas of Expertise</Text>
    {renderChips(profile.specialization)}

    {/* Languages */}
    <Text style={styles.sectionTitle}>Languages Spoken</Text>
    {renderChips(profile.languagesSpoken)}

    {/* Contact */}
    <View style={styles.contactCard}>
      <Text style={styles.contactLabel}>Clinic Contact</Text>
      <Text style={styles.contactValue}>{profile.phone}</Text>
    </View>

  </View>
)

      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FA', padding: 16 },

  doctorHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},

avatar: {
  width: 54,
  height: 54,
  borderRadius: 27,
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

doctorName: {
  fontSize: 18,
  fontWeight: '700',
  color: '#222',
},

doctorDegree: {
  fontSize: 13,
  color: '#666',
  marginTop: 2,
},

infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 16,
},

infoBox: {
  flex: 1,
  backgroundColor: '#F4F8F6',
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginHorizontal: 6,
},

infoValue: {
  fontSize: 18,
  fontWeight: '700',
  color: Colors.PRIMARY,
},

infoLabel: {
  fontSize: 12,
  color: '#555',
  marginTop: 4,
},

profileText: {
  fontSize: 14,
  color: '#444',
  lineHeight: 20,
},

contactCard: {
  marginTop: 20,
  backgroundColor: '#F1F3F6',
  padding: 14,
  borderRadius: 12,
},

contactLabel: {
  fontSize: 12,
  color: '#666',
  marginBottom: 4,
},

contactValue: {
  fontSize: 15,
  fontWeight: '600',
  color: '#222',
},

  headerCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },
  title: { fontSize: 22, fontWeight: '700' },
  editText: { color: Colors.PRIMARY, fontWeight: '600' },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    marginBottom: 20,
  },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginVertical: 12 },
  label: { fontSize: 13, color: '#555', marginBottom: 4 },
  input: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  multiline: { height: 90, textAlignVertical: 'top' },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  profileItem: { marginBottom: 8, fontSize: 14 },
  bold: { fontWeight: '600' },

  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: Colors.PRIMARY + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: Colors.PRIMARY, fontWeight: '500' },
});
