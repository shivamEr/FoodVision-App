import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../shared/Colors'
import LoadingDialog from './shared/LoadingDialog'
import { useContext, useState } from 'react'
import { GenerateWithAi } from '../services/AiModel';
import Prompt from '../shared/Prompt';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'expo-router';

export default function RecipeOptionList({ recipeOption }) {
    const [loading, setLoading] = useState(false);
    const CreateRecipe = useMutation(api.Recipes.CreateRecipe)
    const { user } = useContext(UserContext)
    const router = useRouter();

    const onRecipeOptionSelect = async (recipe) => {
        setLoading(true);
        try {
            const PROMPT = "RecipeName : " + recipe.recipeName + " ,Recipe Description : " + recipe.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
            // console.log("Prompt : " , PROMPT)
            const AIResult = await GenerateWithAi(PROMPT);
            // Parse AI Result to Json object and make sure replace any unwanted characters
            const JSONContent = JSON.parse(AIResult.replace('```json', '').replace('```', ''));
            // console.log(JSONContent)

            // Generate RecipeImage
            // const aiImage = await GenerateImageWithAI(JSONContent.imagePrompt);
            // console.log("Ai Image", aiImage)

            // Save to database
            const saveRecipeResult = await CreateRecipe({
                jsonData: JSONContent,
                imageURI: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfx0EZ_atQzJ02juJ9rckhMv2MM2vpmzYBHA&s",
                recipeName: JSONContent?.recipeName,
                uid: user?._id
            })
            console.log("Saved Recipe result : ", saveRecipeResult)

            setLoading(false);

            // Redirect to Recipe-Detail screen
            router.push({
                pathname: "/recipe-detail",
                params: {
                    recipeId: saveRecipeResult,
                }
            });



        } catch (error) {
            console.log(error)
            setLoading(false);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>Select Recipe</Text>
            <View>
                {
                    recipeOption?.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onRecipeOptionSelect(item)}
                            style={{
                                padding: 15,
                                borderWidth: 0.2,
                                borderRadius: 15,
                                marginTop: 15
                            }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>{item?.recipeName}</Text>
                            <Text style={{
                                color: Colors.GRAY
                            }}>{item?.description}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <LoadingDialog loading={loading} />
        </View>
    )
}