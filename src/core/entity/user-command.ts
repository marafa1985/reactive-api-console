import z from "zod/v3";

export const userCommandSchema = z.object({
  command: z.string(),
  timestamp: z.number().default(Date.now()),
});

export type UserCommand = z.infer<typeof userCommandSchema>;
