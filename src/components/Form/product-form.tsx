"use client";

import { formSchema } from "@/lib/FormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProduct";
import { CategoryInput } from "@/components/CategoryInput/category-input";
import { Loader2 } from "lucide-react";
import { IFormProps } from "@/types/Product.types";

export function ProductForm({ product }: IFormProps) {
  const { createProduct, isCreating, updateProduct, isUpdating } =
    useProducts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      categories: product?.categories || [],
    },
  });
  function onSubmit({ ...values }: z.infer<typeof formSchema>) {
    if (product) {
      updateProduct({ id: product.id, data: values });
      toast.success("Product updated successfully!");
    } else {
      createProduct({ ...values });
      form.reset();
      toast.success("Product created successfully!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="Running shoes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field, fieldState }) => (
            <CategoryInput
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Button
          type="submit"
          disabled={isCreating || isUpdating}
          className="h-9 w-18"
        >
          {((isCreating || isUpdating) && (
            <Loader2 className="size-4 animate-spin" />
          )) ||
            (product ? "Update" : "Create")}
        </Button>
      </form>
    </Form>
  );
}
