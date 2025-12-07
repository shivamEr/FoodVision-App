import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Colors from '../shared/Colors';

export default function RecipeSteps({ recipeDetail }) {
    const steps = (recipeDetail?.jsonData?.steps) || [];

    return (
        <View style={{ marginTop: 20 }}>
            <Text>Direction</Text>
            <FlatList
                data={steps}
                renderItem={({ item, index }) => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems:'center',
                        gap: 10,
                        padding:10,
                        marginTop:10,
                        borderWidth:0.3,
                        borderRadius:15
                    }}>
                        <Text style={{
                            fontSize:15,
                            padding:10,
                            backgroundColor:Colors.PRIMARY,
                            color:Colors.WHITE,
                            borderRadius:99,
                            paddingHorizontal: 15
                        }}>{index + 1}</Text>
                        <Text style={{
                            flex:1,
                            flexShrink:1,
                            fontSize:18
                        }}>{item}</Text>

                    </View>
                )}
            />
        </View>
    )
}