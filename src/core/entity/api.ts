import z from "zod/v3";
import { apiResponseSchema } from "./api-response";

export const apiSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  baseUrl: z.string(),
  getUrl: z
    .function()
    .args(z.string().optional(), z.string().optional())
    .returns(z.string()),
  body: z.any().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]).optional().default("GET"),
  params: z.record(z.string(), z.string()).optional(),
  commands: z.array(z.string()),
  examples: z.array(z.string()),
  isActive: z.boolean(),
  transformResponse: z
    .function()
    .args(z.any())
    .returns(apiResponseSchema)
    .optional(),
});

export type ApiEndpoint = z.infer<typeof apiSchema>;
