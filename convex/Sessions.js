import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const startSession = mutation({
    args: {
        consultationId: v.id("consultations"),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("sessions")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();

        if (existing.length > 0) {
            throw new Error("Session already started");
        }

        const id = await ctx.db.insert("sessions", {
            consultationId: args.consultationId,
            startedAt: Date.now(),
        });

        // Update consultation status to completed? No, start session doesn't complete it yet.

        return id;
    }
});

export const saveSessionNotes = mutation({
    args: {
        sessionId: v.id("sessions"),
        notes: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.sessionId, {
            notes: args.notes,
            endedAt: Date.now(),
        });

        // Update consultation status to completed
        const session = await ctx.db.get(args.sessionId);
        await ctx.db.patch(session.consultationId, { status: "completed" });
    }
});

export const getSession = query({
    args: {
        consultationId: v.id("consultations"),
    },
    handler: async (ctx, args) => {
        const sessions = await ctx.db
            .query("sessions")
            .filter(q => q.eq(q.field("consultationId"), args.consultationId))
            .collect();
        return sessions[0] || null;
    }
});