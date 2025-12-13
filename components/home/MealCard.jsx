import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import Colors from '../../shared/Colors'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function MealCard({ mealPlanInfo, refreshData }) {
    const updateStatus = useMutation(api.MealPlan.UpdateMealPlanStatus)
    const onCheck = async (isCompleted) => {
        // Handle check/uncheck action here
       const result = await updateStatus({
            id: mealPlanInfo?.mealPlan?._id,
            completed: isCompleted
        });
        console.log("Update Meal Plan Status Result:", result);
        Alert.alert("Success", `Meal marked as ${isCompleted ? 'completed' : 'incomplete'}`) ;
        refreshData();
    }
    return (
        <View style={{
            padding: 10,
            borderradius: 18,
            backgroundColor: Colors.WHITE,
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10
        }}>
            <Image source={{ uri: mealPlanInfo.recipe.imageURI }} style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: "#eee" }} />

            <View style={{
                flex: 1,
                marginLeft: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View>
                    <Text style={styles.mealTypeText}>{mealPlanInfo?.mealPlan?.mealType}</Text>
                    <Text style={styles.recipeNameText}>{mealPlanInfo?.recipe?.recipeName}</Text>
                    <Text style={styles.calories}>{mealPlanInfo?.recipe?.jsonData?.calories} kcal</Text>
                </View>
                <View>
                    {mealPlanInfo?.mealPlan?.completed ? (
                        <TouchableOpacity onPress={() => onCheck(false)} style={styles.checkCircle}>
                            <Ionicons name="checkmark" size={14} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => onCheck(true)} style={styles.uncheckCircle} />
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mealTypeText: {
        backgroundColor: Colors.SECONDARY,
        color: Colors.PRIMARY,
        padding: 1,
        paddingHorizontal: 10,
        borderRadius: 99,
    },
    recipeNameText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    calories: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
        color: Colors.GREEN,
    },
    checkCircle: {
        width: 30,
        height: 30,
        backgroundColor: "#0D9E71",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    uncheckCircle: {
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#ccc",
    },
})