import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Colors from '../shared/Colors';
import Button from './shared/Button';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const mealOptions = [
    {
        id: '1',
        name: 'Breakfast',
        icon: '🍳',
    },
    {
        id: '2',
        name: 'Lunch',
        icon: '🥪',
    },
    {
        id: '3',
        name: 'Dinner',
        icon: '🍝',
    },
    {
        id: '4',
        name: 'Snacks',
        icon: '🍎',
    },
];

export default function AddToMealActionSheet({ recipeDetail, hideActionSheet }) {
    const [dateList, setDateList] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);

    const GenerateDates = () => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            const nextDate = moment().add(i, 'days').format('DD/MM/YYYY')
            result.push(nextDate)
        }
        console.log(result);
        setDateList(result);
    }

    useEffect(() => {
        GenerateDates();
    }, [])

    const AddToMealPlan = async() =>{
        if(!selectedDate || !selectedMeal){
            Alert.alert('Error', 'Please Select All Details!')
            return;
        }
        try {
            console.log(selectedDate)
            const result = await CreateMealPlan({
                date:selectedDate,
                mealType:selectedMeal,
                calories: recipeDetail.jsonData.calories,
                recipeId:recipeDetail._id,
                uid: recipeDetail.uid,
                completed: false
            })
            Alert.alert('Success','Meal Added to Recipe Plan')
            hideActionSheet();
            
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Add to Meal</Text>

            <Text style={{
                fontSize: 20,
                fontWeight: '500',
                marginTop: 15
            }}>Select Date</Text>
            <FlatList
                data={dateList}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedDate(item)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectedDate === item ? Colors.SECONDARY : Colors.WHITE,
                            borderColor: selectedDate === item ? Colors.PRIMARY : Colors.GRAY,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',

                        }}>{moment(item, 'DD/MM/YYYY').format('ddd')}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{moment(item, 'DD/MM/YYYY').format('DD')}</Text>
                        <Text style={{
                            fontSize: 16,
                        }}>{moment(item, 'DD/MM/YYYY').format('MM')}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={{
                fontSize: 20,
                fontWeight: '500',
                marginTop: 15
            }}>Select Meal</Text>
            <FlatList
                data={mealOptions}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedMeal(item?.name)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectedMeal === item.name ? Colors.SECONDARY : Colors.WHITE,
                            borderColor: selectedMeal === item.name ? Colors.PRIMARY : Colors.GRAY,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',

                        }}>{item?.icon}</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 15 }}>
                <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan}/>
                <TouchableOpacity
                    onPress={() => hideActionSheet()}
                    style={{ marginTop: 15 }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20
                    }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}