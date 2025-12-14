import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.optional(v.string()),
        subscriptionId: v.optional(v.string()),
        credits: v.number(),
        height: v.optional(v.string()),
        weight: v.optional(v.string()),
        age: v.optional(v.string()),
        gender: v.optional(v.string()),
        activityLevel: v.optional(v.string()),
        goal: v.optional(v.string()),
        calories: v.optional(v.number()),
        proteins: v.optional(v.number()),
        role: v.optional(v.string()),
    }),

    recipes: defineTable({
        jsonData: v.any(),
        uid: v.id('users'),
        imageURI : v.string(),
        recipeName : v.string()
    }),

    mealPlan: defineTable({
        uid: v.id('users'),
        recipeId: v.id('recipes'),
        mealType: v.string(),
        calories: v.number(),
        date: v.string(),
        completed: v.boolean(),
    })
})