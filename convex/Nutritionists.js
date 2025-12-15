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
        specialization: v.array(v.string()),
        clinicAddress: v.optional(v.string()),
        consultationModes: v.object({
            online: v.boolean(),
            offline: v.boolean(),
        }),
        languagesSpoken: v.array(v.string()),
        consultationFee: v.number(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("nutritionists")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .collect();

        if (existing.length > 0) {
            throw new Error("Nutritionist profile already exists");
        }

        // Generate slots for next 7 days
        const slots = [];
        const now = new Date();
        for (let i = 1; i <= 7; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
            const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
            times.forEach(time => {
                slots.push({
                    date: dateStr,
                    time,
                    isBooked: false,
                });
            });
        }

        const id = await ctx.db.insert("nutritionists", {
            ...args,
            availableSlots: slots,
            isVerified: true,
            isActive: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
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
        specialization: v.optional(v.array(v.string())),
        clinicAddress: v.optional(v.string()),
        consultationModes: v.optional(v.object({
            online: v.boolean(),
            offline: v.boolean(),
        })),
        languagesSpoken: v.optional(v.array(v.string())),
        consultationFee: v.optional(v.number()),
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
        await ctx.db.patch(nutritionistId, { ...updates, updatedAt: Date.now() });
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
        if (!user) return null;

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
                if (!user) return null;
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
        return results.filter(r => r !== null).filter(n => n.isActive && n.isVerified);
    }
});

/* FILTER BY SPECIALIZATION */
export const getNutritionistBySpecialization = query({
  args: { specialization: v.string() },
  handler: async (ctx, { specialization }) => {
    const all = await ctx.db.query("nutritionists").collect();
    return all.filter(n =>
      n.specialization.includes(specialization)
    );
  },
});