import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateMealPlan = mutation({
    args: {
        uid: v.id('users'),
        recipeId: v.id('recipes'),
        date: v.string(),
        mealType: v.string(),
        calories: v.number(),
        completed: v.optional(v.boolean()),

    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('mealPlan', {
            uid: args.uid,
            recipeId: args.recipeId,
            date: args.date,
            mealType: args.mealType,
            calories: args.calories,
            completed: args.completed || false
        })
        return result;
    }
})

export const GetTodaysMealPlan = query({
    args: {
        uid: v.id("users"),
        date: v.string(),
    },

    handler: async (ctx, args) => {
        // Check for active expert diet plan
        const expertPlan = await ctx.db
            .query("expertDietPlans")
            .filter(q => q.and(
                q.eq(q.field("userId"), args.uid),
                q.eq(q.field("isActive"), true)
            ))
            .collect();

        if (expertPlan.length > 0) {
            // Return expert plan meals
            return expertPlan[0].meals.map(meal => ({
                mealPlan: null, // No mealPlan entry
                recipe: {
                    recipeName: meal.name,
                    jsonData: { calories: meal.calories, macros: meal.macros },
                    imageURI: "", // Placeholder
                },
                isExpert: true,
            }));
        }

        // Fetch AI meal plans filtered by uid + date
        const mealPlans = await ctx.db
            .query("mealPlan")
            .filter((q) =>
                q.and(
                    q.eq(q.field("uid"), args.uid),
                    q.eq(q.field("date"), args.date)
                )
            )
            .collect();

        // Fetch recipes for each meal plan
        const results = await Promise.all(
            mealPlans.map(async (mealPlan) => {
                const recipe = await ctx.db.get(mealPlan.recipeId);

                return {
                    mealPlan,
                    recipe,
                    isExpert: false,
                };
            })
        );

        return results;
    },
});

export const UpdateMealPlanStatus = mutation({
    args: {
        id: v.id('mealPlan'),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const updatedMealPlan = await ctx.db.patch(args.id, {
            completed: args.completed,
        });
        return updatedMealPlan;
    }
});

export const GetTotalCaloriesByDate = query({
    args: {
        uid: v.id("users"),
        date: v.string(),
    },

    handler: async (ctx, args) => {
        const mealPlans = await ctx.db
            .query("mealPlan")
            .filter((q) =>
                q.and(
                    q.eq(q.field("uid"), args.uid),
                    q.eq(q.field("date"), args.date),
                    q.eq(q.field("completed"), true)
                )
            )
            .collect();
        const totalCalories = mealPlans.reduce((total, mealPlan) => total + mealPlan.calories, 0);
        return totalCalories;
    }

});

