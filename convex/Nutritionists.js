import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Nutritionist Profile CRUD
export const createNutritionistProfile = mutation({
    args: {
        userId: v.id("users"),
        phone: v.string(),
        bio: v.string(),
        degree: v.string(),
        dietPhilosophy: v.string(),
        experienceYears: v.number(),
        clinicAddress: v.optional(v.string()),
        consultationModes: v.object({
            online: v.boolean(),
            offline: v.boolean(),
        }),
        availableSlots: v.array(
            v.object({
                date: v.string(),
                time: v.string(),
                isBooked: v.boolean(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("nutritionists")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .collect();

        if (existing.length > 0) {
            throw new Error("Nutritionist profile already exists");
        }

        const id = await ctx.db.insert("nutritionists", {
            ...args,
            isVerified: false,
            isActive: true,
            createdAt: Date.now(),
        });

        return id;
    }
});

export const updateNutritionistProfile = mutation({
    args: {
        nutritionistId: v.id("nutritionists"),
        phone: v.optional(v.string()),
        bio: v.optional(v.string()),
        degree: v.optional(v.string()),
        dietPhilosophy: v.optional(v.string()),
        experienceYears: v.optional(v.number()),
        clinicAddress: v.optional(v.string()),
        consultationModes: v.optional(v.object({
            online: v.boolean(),
            offline: v.boolean(),
        })),
        availableSlots: v.optional(v.array(
            v.object({
                date: v.string(),
                time: v.string(),
                isBooked: v.boolean(),
            })
        )),
    },
    handler: async (ctx, args) => {
        const { nutritionistId, ...updates } = args;
        await ctx.db.patch(nutritionistId, updates);
    }
});

export const getNutritionistProfile = query({
    args: {
        nutritionistId: v.id("nutritionists"),
    },
    handler: async (ctx, args) => {
        const profile = await ctx.db.get(args.nutritionistId);
        if (!profile) return null;

        const user = await ctx.db.get(profile.userId);
        return {
            ...profile,
            user: {
                name: user.name,
                email: user.email,
                picture: user.picture,
            }
        };
    }
});

export const getAllNutritionists = query({
    handler: async (ctx) => {
        const nutritionists = await ctx.db.query("nutritionists").collect();
        const results = await Promise.all(
            nutritionists.map(async (nutri) => {
                const user = await ctx.db.get(nutri.userId);
                return {
                    ...nutri,
                    user: {
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                    }
                };
            })
        );
        return results.filter(n => n.isActive && n.isVerified);
    }
});