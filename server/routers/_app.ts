import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const appRouter = router({
    hello: publicProcedure
        .input(
            z.object({
                text: z.string().nullish(),
            })
        )
        .query(({ input }) => {
            return {
                greeting: `Hello, ${input?.text ?? "world"}!`,
            };
        }),
});

export type AppRouter = typeof appRouter;
