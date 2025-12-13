import { Text, ScrollView, View } from "react-native";
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
    const [mealPlan, setMealPlan] = useState(null);

    useEffect(() => {
        if (!user?.weight) {
            router.replace("/preferences");
        }
        GetTodaysMealPlan();
    }, [user]);

    const GetTodaysMealPlan = async () => {
        const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
            date: moment().format('DD/MM/YYYY'),
            uid: user?._id,
        })
        console.log("Today's Meal Plan:",result);
        setMealPlan(result);
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F7F7F7", padding: 20 }}>
            <Header name={user?.name} />

            <TodayProgress />

            <GenerateRecipeCard />

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#222" }}>
                Today’s Meals
            </Text>

            {
                !mealPlan ?
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

