import z from "zod/v3";
import { apiResponseSchema } from "./api-response";

export const apiSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  baseUrl: z.string(),
  body: z.any().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]).optional().default("GET"),
  params: z.record(z.string(), z.string()).optional(),
  commands: z.array(z.string()),
  examples: z.array(z.string()),
  isActive: z.boolean(),
});

export const apiWithHandlerSchema = apiSchema.extend({
  getUrl: z
    .function()
    .args(z.record(z.string(), z.any()).optional(), z.string().optional())
    .returns(z.string()),
  transformResponse: z
    .function()
    .args(z.any())
    .returns(apiResponseSchema)
    .optional(),
});

export type Api = z.infer<typeof apiSchema>;

export type ApiWithHandler = z.infer<typeof apiWithHandlerSchema>;
