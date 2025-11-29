"use client";

import { formSchema } from "@/lib/FormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  Field,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryInput } from "@/components/CategoryInput/category-input";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProduct";
import { Loader2 } from "lucide-react";
import { IFormProps } from "@/types/Product.types";

type FormValues = z.infer<typeof formSchema>;

export function ProductForm({ product }: IFormProps) {
  const { createProduct, isCreating, updateProduct, isUpdating } =
    useProducts();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      categories: product?.categories || [],
    },
  });
  function onSubmit({ ...values }: FormValues) {
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Product name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jacket"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  Choose a unique name for your product.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Product price</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="100"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  Set a price for your product.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="categories"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <CategoryInput
                  {...field}
                  error={[fieldState.error]}
                  invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

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
  );
}
