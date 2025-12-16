import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import Header from "../../components/home/Header";
import TodayProgress from "../../components/home/TodayProgress";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../../components/shared/Button";
import Colors from "../../shared/Colors";
import TodaysMealPlan from "../../components/home/TodaysMealPlan";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import moment from "moment";


export default function Home() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const convex = useConvex();
    const [mealPlan, setMealPlan] = useState([]);
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        if (!user?.weight) {
            router.replace("/preferences");
        }
        GetTodaysMealPlan();
        GetUserConsultations();
    }, [user]);

    const GetTodaysMealPlan = async () => {
        const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
            date: moment().format('DD/MM/YYYY'),
            uid: user?._id,
        })
        console.log("Today's Meal Plan:", result);
        setMealPlan(result);
    }

    const GetUserConsultations = async () => {
        if (user?._id) {
            const result = await convex.query(api.Consultations.getUserConsultations, {
                userId: user._id,
            });
            setConsultations(result);
        }
    }

    const upcomingConsultation = consultations.find(c => c.status === 'confirmed');
    const recentConsultation = consultations.find(c => c.status === 'completed');

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F7F7F7", padding: 20 }}>
            <Header name={user?.name} />

            <TodayProgress />

            <GenerateRecipeCard />

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                    alignItems: 'center',
                }}
                onPress={() => router.push('/consultancy')}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Consult a Nutritionist
                </Text>
            </TouchableOpacity>

            {/* Consultations Section */}
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" }}>
                My Consultations
            </Text>
            <View style={{ marginBottom: 20 }}>
                {upcomingConsultation ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() => router.push(`/consultancy/details/${upcomingConsultation._id}`)}
                    >
                        <View style={{ backgroundColor: Colors.PRIMARY, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                            <MaterialCommunityIcons name="calendar-clock" size={20} color="white" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Upcoming Consultation</Text>
                            <Text style={{ fontSize: 14, color: 'gray' }}>{upcomingConsultation.nutritionist.user.name} • {upcomingConsultation.slot.date}</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="gray" />
                    </TouchableOpacity>
                ) : (
                    <View style={{
                        backgroundColor: 'white',
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 3,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{ backgroundColor: '#e9ecef', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                            <MaterialCommunityIcons name="calendar-clock" size={20} color="gray" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'gray' }}>No Upcoming Consultations</Text>
                            <Text style={{ fontSize: 14, color: 'gray' }}>Book your first consultation</Text>
                        </View>
                    </View>
                )}

                {recentConsultation && (
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() => router.push(`/consultancy/details/${recentConsultation._id}`)}
                    >
                        <View style={{ backgroundColor: Colors.GREEN, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                            <MaterialCommunityIcons name="check-circle" size={20} color="white" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Recent Consultation</Text>
                            <Text style={{ fontSize: 14, color: 'gray' }}>{recentConsultation.nutritionist.user.name} • Completed</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" }}>
                Today’s Meals
            </Text>

            {
                mealPlan.length == 0 ?
                    <View style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: 'white',
                        marginTop: 15,
                        borderRadius: 15

                    }}>
                        <MaterialCommunityIcons name="calendar-import" size={40} color={Colors.PRIMARY} />
                        <Text style={{
                            fontSize: 18,
                            color: 'gray',
                            marginBottom: 15
                        }}>You Don't have any meal for today</Text>
                        <Button title={'Create New Meal Plan'} />
                    </View> :
                    <TodaysMealPlan mealPlan={mealPlan} refreshData={GetTodaysMealPlan} />
            }
        </ScrollView>
    );
}

