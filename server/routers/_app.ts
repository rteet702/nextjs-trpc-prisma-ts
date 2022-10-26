import { z } from "zod";
import { hash } from "bcrypt";
import { router, publicProcedure } from "../trpc";

interface User {
    id: String;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
}

interface Message {
    id: String;
    author: User;
    content: String;
}

export const appRouter = router({
    getAllUsers: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany();
        return {
            users: users,
        };
    }),
    createUser: publicProcedure
        .input(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                email: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            // Something here...
            const { firstName, lastName, email, password } = input;
            const pwHash = await hash(password, 10);
            const user = await ctx.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: pwHash,
                },
            });
            return {
                // Something... eventually...
                user,
            };
        }),
    deleteUser: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.user.delete({
                where: {
                    id: input.id,
                },
            });
            return {
                message: "User deleted",
            };
        }),
});

export type AppRouter = typeof appRouter;
