import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Colors from '../shared/Colors';
import Button from './shared/Button';

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
                        onPress={() => setSelectedMeal(item)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectedMeal === item ? Colors.SECONDARY : Colors.WHITE,
                            borderColor: selectedMeal === item ? Colors.PRIMARY : Colors.GRAY,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',

                        }}>{item?.icon}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 15 }}>
                <Button title={'+ Add to Meal Plan'} />
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