import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required." })
    .min(3, { error: "Product name must be at least 3 characters." })
    .max(15, { error: "Max name length reached" }),
  price: z.coerce.number().positive("Price must be a positive number"),
  categories: z
    .array(z.string())
    .min(1, { error: "Category is required" })
    .max(3, { error: "Only three or less categories allowed" }),
});
