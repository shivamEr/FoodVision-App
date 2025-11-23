import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.optional(v.string()),
        subscriptionId: v.optional(v.string()),
        credits: v.number(),
        height: v.optional(v.float64()),
        weight: v.optional(v.float64()),
        age: v.optional(v.string()),
        gender: v.optional(v.string()),
        activityLevel: v.optional(v.string()),
        goals: v.optional(v.string()),

    })
})