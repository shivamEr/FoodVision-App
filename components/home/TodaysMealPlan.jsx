
import { View } from 'react-native'
import MealCard from './MealCard';

export default function TodaysMealPlan({ mealPlan, refreshData }) {

  return (
    <View>
      {mealPlan && mealPlan.map((meal) => (
        <MealCard key={meal?.mealPlan?._id} mealPlanInfo={meal} refreshData={refreshData} />
      ))}
    </View>
  )
}