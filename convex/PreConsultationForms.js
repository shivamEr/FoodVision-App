import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const savePreConsultationForm = mutation({
    args: {
        consultationId: v.id("consultations"),
        goals: v.string(),
        medicalConditions: v.optional(v.string()),
        allergies: v.optional(v.string()),
        dietPreference: v.string(),
        currentIssues: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("preConsultationForms")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();

        if (existing.length > 0) {
            await ctx.db.patch(existing[0]._id, args);
            return existing[0]._id;
        } else {
            const id = await ctx.db.insert("preConsultationForms", {
                ...args,
                createdAt: Date.now(),
            });
            return id;
        }
    }
});

export const getPreConsultationForm = query({
    args: {
        consultationId: v.id("consultations"),
    },
    handler: async (ctx, args) => {
        const forms = await ctx.db
            .query("preConsultationForms")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();
        return forms[0] || null;
    }
});