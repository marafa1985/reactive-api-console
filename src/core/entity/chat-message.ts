import z from "zod/v3";
import { apiResponseSchema } from "./api-response";

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  timestamp: z.number(),
  type: z.enum(["user", "system", "error"]),
  apiResponse: apiResponseSchema.optional(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;
