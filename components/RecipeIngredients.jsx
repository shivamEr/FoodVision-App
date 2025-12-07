import { View, Text, FlatList } from 'react-native'
import Colors from '../shared/Colors';

export default function RecipeIngredients({ recipeDetail }) {
    const ingredients = (recipeDetail?.jsonData?.ingredients) || [];
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>Ingredients</Text>
            <Text style={{
                fontSize: 20,
            }}>{ingredients?.length} Items</Text>
            </View>

            <FlatList data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        marginTop:19,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <View style={{
                            display:'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            <Text style={{
                                fontSize: 25,
                                padding: 7,
                                borderRadius: 99,
                                backgroundColor: Colors.SECONDARY,
                            }}>{item?.icon}</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500'
                            }}>{item?.ingredient}</Text>
                        </View>
                        <Text style={{
                            color:Colors.GRAY,
                            fontSize:16
                        }}>{item?.quantity}</Text>
                    </View>
                )}
            />
        </View>
    )
}