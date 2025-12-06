import { View, Text, Platform, TextInput, StyleSheet, Alert } from 'react-native'
import Colors from '../../shared/Colors'
import Button from '../../components/shared/Button'
import { useState } from 'react'
import Prompt from '../../shared/Prompt'
import { GenerateWithAi } from '../../services/AiModel'
import RecipeOptionList from '../../components/RecipeOptionList'

export default function GenerateAiRecipe() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipeOption, setRecipeOption] = useState([])

    const GenerateRecipeOptions = async () => {
        if(!input) {
            Alert.alert("Field can't be empty!", "Please Enter Recipe name or Ingredient!")
            return;
        }
        setLoading(true);
        try {
            const PROMPT = Prompt.GENERATE_RECIPE_OPTION_PROMPT + input;
            const AIResult = await GenerateWithAi(PROMPT);
            // Parse AI Result to Json object and make sure replace any unwanted characters
            const JSONContent = JSON.parse(AIResult.replace('```json', '').replace('```', ''));
            setRecipeOption(JSONContent);
            console.log(AIResult)
            setLoading(false);

        } catch (error) {
            Alert.alert("AI isn't working", 'Unable to Generate Recipe!')
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <View style={{
            paddingTop: Platform.OS == "ios" ? 50 : 40,
            padding: 20,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: "bold",
            }}>AI Recipe Generator</Text>

            <Text style={{
                marginTop: 5,
                color: Colors.GRAY,
                fontSize: 16
            }}>
                Generate Personalized recipes using AI
            </Text>

            <TextInput
                placeholder='Enter your ingredient of recipe name'
                value={input}
                onChangeText={setInput}
                style={styles.textArea} />

            <View style={{
                marginTop: 25
            }}>
                <Button
                    title={'Generate Recipe'}
                    loading={loading}
                    onPress={GenerateRecipeOptions} />
            </View>

           {recipeOption?.length > 0 && <RecipeOptionList recipeOption={recipeOption}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        padding: 15,
        borderwidth: 1,
        borderRadius: 10,
        fontSize: 20,
        marginTop: 15,
        height: 150,
        textAlignVertical: 'top',
        backgroundColor: Colors.WHITE
    }
})