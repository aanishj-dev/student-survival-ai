import { useState } from "react"
import MealPlanner from "./MealPlanner"
import GroceryList from "./GroceryList"

function MealsWorkspace() {
  const [latestMealPlan, setLatestMealPlan] = useState("")

  return (
    <>
      <MealPlanner onMealPlanGenerated={setLatestMealPlan} />
      <GroceryList mealPlanFromApp={latestMealPlan} />
    </>
  )
}

export default MealsWorkspace