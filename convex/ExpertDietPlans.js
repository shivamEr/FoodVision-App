import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createExpertDietPlan = mutation({
    args: {
        consultationId: v.id("consultations"),
        userId: v.id("users"),
        meals: v.array(
            v.object({
                name: v.string(),
                calories: v.number(),
                macros: v.object({
                    protein: v.number(),
                    carbs: v.number(),
                    fat: v.number(),
                }),
            })
        ),
    },
    handler: async (ctx, args) => {
        // Deactivate any existing active plan for this consultation
        const existing = await ctx.db
            .query("expertDietPlans")
            .filter(q => q.and(
                q.eq(q.field("consultationId"), args.consultationId),
                q.eq(q.field("isActive"), true)
            ))
            .collect();

        for (const plan of existing) {
            await ctx.db.patch(plan._id, { isActive: false });
        }

        const id = await ctx.db.insert("expertDietPlans", {
            ...args,
            isActive: true,
            publishedAt: Date.now(),
        });

        return id;
    }
});

export const updateExpertDietPlan = mutation({
    args: {
        planId: v.id("expertDietPlans"),
        meals: v.array(
            v.object({
                name: v.string(),
                calories: v.number(),
                macros: v.object({
                    protein: v.number(),
                    carbs: v.number(),
                    fat: v.number(),
                }),
            })
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.planId, { meals: args.meals });
    }
});

export const getExpertDietPlan = query({
    args: {
        consultationId: v.id("consultations"),
    },
    handler: async (ctx, args) => {
        const plans = await ctx.db
            .query("expertDietPlans")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();
        return plans[0] || null;
    }
});

export const getActiveExpertDietPlan = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const plans = await ctx.db
            .query("expertDietPlans")
            .filter(q => q.and(
                q.eq(q.field("userId"), args.userId),
                q.eq(q.field("isActive"), true)
            ))
            .collect();
        return plans[0] || null;
    }
});