import z from "zod/v3";

export const apiResponseSchema = z.object({
  id: z.string(),
  apiId: z.string(),
  timestamp: z.number(),
  data: z.any(),
  error: z.string().optional(),
  loading: z.boolean().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
