import { Text, ScrollView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import Header from "../../components/home/Header";
import TodayProgress from "../../components/home/TodayProgress";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import MealCard from "../../components/home/MealCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../../components/shared/Button";
import Colors from "../../shared/Colors";

const meals = [
    {
        id: 1,
        type: "Breakfast",
        name: "Avocado Toast & Eggs",
        calories: 420,
        time: "8:00 AM",
        completed: true,
    },
    {
        id: 2,
        type: "Lunch",
        name: "Grilled Chicken Salad",
        calories: 520,
        time: "1:00 PM",
        completed: false,
    },
    {
        id: 3,
        type: "Dinner",
        name: "Salmon with Quinoa",
        calories: 580,
        time: "7:00 PM",
        completed: false,
    },
];

export default function Home() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [mealPlan, setMealPlan] = useState();

    useEffect(() => {
        if (!user?.weight) {
            router.replace("/preferences");
        }
    }, [user]);


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F7F7F7", padding: 20 }}>
            <Header name={user?.name} />

            <TodayProgress />

            <GenerateRecipeCard />

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" }}>
                Today’s Meals
            </Text>

            { mealPlan && mealPlan.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}

            {
                !mealPlan&&
                <View style={{
                    display:"flex",
                    alignItems:"center",
                    padding:20,
                    backgroundColor:'white',
                    marginTop:15,
                    borderRadius:15

                }}>
                    <MaterialCommunityIcons name="calendar-import" size={40} color={Colors.PRIMARY} />
                    <Text style={{
                        fontSize:18,
                        color:'gray',
                        marginBottom:15
                    }}>You Don't have any meal for today</Text>
                    <Button title={'Create New Meal Plan'} />
                </View>
            }
        </ScrollView>
    );
}

