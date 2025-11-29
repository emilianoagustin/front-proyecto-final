import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .min(3, "Product name must be at least 3 characters.")
    .max(15, "Max name length reached"),
  price: z.coerce.number().positive("Price must be a positive number"),
  categories: z
    .array(z.string())
    .min(1, "Category is required")
    .max(3, "Only three or less categories allowed"),
});

export const authSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});
