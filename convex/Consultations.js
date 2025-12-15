import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create consultation
export const createConsultation = mutation({
    args: {
        userId: v.id("users"),
        nutritionistId: v.id("nutritionists"),
        consultationType: v.union(v.literal("online"), v.literal("offline")),
        slot: v.object({
            date: v.string(),
            time: v.string(),
        }),
        meetLink: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if slot is available
        const nutritionist = await ctx.db.get(args.nutritionistId);
        if (!nutritionist) throw new Error("Nutritionist not found");

        const slotIndex = nutritionist.availableSlots.findIndex(
            s => s.date === args.slot.date && s.time === args.slot.time && !s.isBooked
        );
        if (slotIndex === -1) throw new Error("Slot not available");

        // Mark slot as booked
        const updatedSlots = [...nutritionist.availableSlots];
        updatedSlots[slotIndex].isBooked = true;
        await ctx.db.patch(args.nutritionistId, { availableSlots: updatedSlots });

        // Create consultation (meetLink saved if provided)
        const consultationId = await ctx.db.insert("consultations", {
            userId: args.userId,
            nutritionistId: args.nutritionistId,
            consultationType: args.consultationType,
            slot: args.slot,
            meetLink: args.meetLink || null,
            status: "upcoming",
            paymentMode: "pay_on_site",
            createdAt: Date.now(),
        });

        return consultationId;
    }
});

// Get consultations for user
export const getUserConsultations = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const consultations = await ctx.db
            .query("consultations")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .collect();

        const results = await Promise.all(
            consultations.map(async (cons) => {
                const nutritionist = await ctx.db.get(cons.nutritionistId);
                const user = await ctx.db.get(nutritionist.userId);
                return {
                    ...cons,
                    nutritionist: {
                        ...nutritionist,
                        user: {
                            name: user.name,
                            email: user.email,
                            picture: user.picture,
                        }
                    }
                };
            })
        );

        return results;
    }
});

// Get consultations for nutritionist
export const getNutritionistConsultations = query({
    args: {
        nutritionistId: v.id("nutritionists"),
    },
    handler: async (ctx, args) => {
        const consultations = await ctx.db
            .query("consultations")
            .filter(q => q.eq(q.field("nutritionistId"), args.nutritionistId))
            .collect();

        const results = await Promise.all(
            consultations.map(async (cons) => {
                const user = await ctx.db.get(cons.userId);
                return {
                    ...cons,
                    user: {
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                    }
                };
            })
        );

        return results;
    }
});

// Get consultation details
export const getConsultationDetails = query({
    args: {
        consultationId: v.id("consultations"),
    },
    handler: async (ctx, args) => {
        const consultation = await ctx.db.get(args.consultationId);
        if (!consultation) return null;

        const nutritionist = await ctx.db.get(consultation.nutritionistId);
        const nutriUser = await ctx.db.get(nutritionist.userId);
        const user = await ctx.db.get(consultation.userId);

        const preForm = await ctx.db
            .query("preConsultationForms")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();

        const session = await ctx.db
            .query("sessions")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();

        const plan = await ctx.db
            .query("expertDietPlans")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();

        return {
            ...consultation,
            nutritionist: {
                ...nutritionist,
                user: {
                    name: nutriUser.name,
                    email: nutriUser.email,
                    picture: nutriUser.picture,
                }
            },
            user: {
                name: user.name,
                email: user.email,
                picture: user.picture,
            },
            preConsultationForm: preForm[0] || null,
            session: session[0] || null,
            expertDietPlan: plan[0] || null,
        };
    }
});

export const setConsultationMeetLink = mutation({
    args: {
        consultationId: v.id("consultations"),
        meetLink: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.consultationId, { meetLink: args.meetLink });
    }
});