import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateRecipe = mutation({
    args: {
        jsonData : v.any(),
        uid: v.id('users'),
        imageURI : v.string(),
        recipeName: v.string()
    },

    handler: async (ctx, args) =>{
        const result = await ctx.db.insert('recipes', {
            jsonData: args.jsonData,
            uid: args.uid,
            imageURI: args.imageURI,
            recipeName: args.imageURI
        });
        return result;
    }
})