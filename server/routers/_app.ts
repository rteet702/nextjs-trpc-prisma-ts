import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const appRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany();
        return {
            users: users,
        };
    }),
});

export type AppRouter = typeof appRouter;
