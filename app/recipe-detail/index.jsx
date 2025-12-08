import { View, Text, Platform, ScrollView, FlatList } from "react-native";
import RecipeIntro from "../../components/RecipeIntro";
import { useLocalSearchParams } from "expo-router";
import { api } from "../../convex/_generated/api";
import Colors from "../../shared/Colors";
import { useQuery } from "convex/react";
import RecipeIngredients from "../../components/RecipeIngredients";
import RecipeSteps from "../../components/RecipeSteps";
import Button from "../../components/shared/Button"
import { useRef } from "react";
import ActionSheet from "react-native-actions-sheet";
import AddToMealActionSheet from "../../components/AddToMealActionSheet";

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const actionSheetRef = useRef(null);

  if (!recipeId) {
    return <Text>Invalid navigation: missing recipeId</Text>;
  }

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, { id: recipeId });

  if (!recipeDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={


        <View style={{
          padding: 20,
          paddingTop: Platform.OS === "ios" ? 40 : 30,
          backgroundColor: Colors.WHITE,
          height: "100%"
        }}>
          {/* Recipe Intro */}
          <RecipeIntro recipeDetail={recipeDetail} />

          {/* Recipe Ingredients */}
          <RecipeIngredients recipeDetail={recipeDetail} />

          {/* Recipe Steps */}
          <RecipeSteps recipeDetail={recipeDetail} />

          <View style={{ marginVertical: 30 }}>
            <Button title={'Add to Meal Plan'} onPress={() => actionSheetRef.current?.show()} />
          </View>

          <ActionSheet gestureEnabled ref={actionSheetRef}>
            <AddToMealActionSheet
              recipeDetail={recipeDetail}
              hideActionSheet={() => actionSheetRef.current?.hide()}
            />
          </ActionSheet>
        </View>
      }></FlatList>
  );
}
