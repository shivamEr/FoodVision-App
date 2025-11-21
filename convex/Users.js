import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        email: v.string(),
        name: v.string()
    },
    handler: async (ctx, args) => {
        // Find user by email
        const existing = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();

        if (existing.length === 0) {
            // Create new user
            const data = {
                name: args.name,
                email: args.email,
                credits: 10
            };

            const id = await ctx.db.insert("users", data);

            return { _id: id, ...data };
        }

        return existing[0];
    }
});

export const GetUser = query({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();
        return existing[0];
    }
})
