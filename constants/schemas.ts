import { z } from "zod";

export const projectPromptSchema = z
  .string()
  .min(3, "Prompt must be at least 3 characters long");
