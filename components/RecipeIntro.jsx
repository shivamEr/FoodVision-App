import { View, Text, Image, StyleSheet } from 'react-native'
import Colors from '../shared/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RecipeIntro({ recipeDetail }) {
    console.log(recipeDetail)
    const RecipeJson = recipeDetail?.jsonData;
    return (
        <View>
            <Image source={{ uri: recipeDetail?.imageURI }} style={{
                width: '100%',
                height: 200,
                borderRadius: 15,
            }} />

            <View style={{
                marginTop: 15,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                }}>{recipeDetail?.recipeName}</Text>
                <MaterialIcons name="add-box" size={40} color={Colors.PRIMARY} />
            </View>

            <Text style={{
                fontSize:16,
                marginTop:6,
                color:Colors.GRAY,
                lineHeight:25
            }}>{RecipeJson?.description}</Text>

            <View style={{
                marginTop:15,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                gap:10
            }}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="local-fire-department" size={30} color={Colors.PRIMARY}  style={styles.iconBg}/>
                    <Text style={styles.subText}>Calories</Text>
                    <Text style={styles.count}>{RecipeJson?.calories}</Text>
                </View>
                {/* <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="dumbbell" size={30} color={Colors.PRIMARY}  style={styles.iconBg}/>
                    <Text style={styles.subText}>Protien</Text>
                    <Text style={styles.count}>{RecipeJson?.protien}</Text>
                </View> */}
                <View style={styles.iconContainer}>
                    <AntDesign name="clock-circle" size={30} color={Colors.PRIMARY}  style={styles.iconBg} />
                    <Text style={styles.subText}>Time</Text>
                    <Text style={styles.count}>{RecipeJson?.cookTime}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="fast-food" size={30} color={Colors.PRIMARY}  style={styles.iconBg} />
                    <Text style={styles.subText}>Serve</Text>
                    <Text style={styles.count}>{RecipeJson?.serveTo}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconBg:{
        padding:6
    },
    iconContainer:{
        display:'flex',
        alignItems:'center',
        padding:6,
        borderRadius: 10,
        backgroundColor: '#fbf5ff',
        flex:1
    },
    subText:{
        fontSize:18
    },
    count:{
        fontSize:20,
        fontWeight:'bold',
        color:Colors.PRIMARY
    }

    
})