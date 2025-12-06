export default {
  CALORIES_PROMPT: `Based on Weight, Height, Gender, Goal give me calories and proteins need daily Consider Age as 28 in JSON format and follow the schema:
  {
    calories:<>,
    proteins:<>
  }`,

  GENERATE_RECIPE_OPTION_PROMPT: `
  Create 3 different recipe variations based on the user's input (ingredient or recipe name).

  Return ONLY a JSON array with objects containing:
  - "recipeName": include 1 emoji
  - "description": max 2 short lines
  - "ingredients": array of ingredient names only (no amounts)

  Keep all three recipes unique and simple.
  USER INPUT: `,

 GENERATE_COMPLETE_RECIPE_PROMPT : ` Generate a complete recipe using the given recipeName and description.

Requirements:
- For each ingredient: provide an emoji icon, name, and quantity with units.
- Provide total calories (number only) and cookTime (minutes, number).
- Choose categories from: ["Breakfast","Lunch","Dinner","Snack","Dessert","Beverage"].
- Create a detailed realistic image prompt describing plating, lighting, angle, background, mood, and garnish.
- Output JSON only using this schema:

{
  "description": "string",
  "recipeName": "string",
  "calories": number,
  "category": ["string"],
  "cookTime": number,
  "imagePrompt": "string",
  "ingredients": [
    {
      "icon": "string",
      "ingredient": "string",
      "quantity": "string"
    }
  ],
  "serveTo": number,
  "steps": ["string"]
}

Fill all fields with relevant values and no extra text.`
  
}
