import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "name is required.")
    .min(3, "product name must be at least 3 characters.")
    .max(15, "max name length reached"),
  price: z.string().min(1, "price is required"),
  categories: z
    .array(z.string())
    .min(1, "category is required")
    .max(3, "only three or less categories allowed"),
});

export const authSchema = z.object({
  email: z.email("email is required"),
  password: z
    .string()
    .min(1, "password is required")
    .min(8, "password has to be 8 characters length"),
});

export const authSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});
