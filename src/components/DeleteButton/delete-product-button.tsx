"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProduct";
import { toast } from "sonner";
import { IDeleteButtonProps } from "@/types/Product.types";

export function DeleteButton({ productId }: IDeleteButtonProps) {
  const { deleteProduct, isDeleting } = useProducts();

  const handleDelete = (userId: string) => {
    deleteProduct(userId);
    toast.success("Product deleted successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="A warning advice to delete a product">
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure to delete this product?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and
            remove this product from the database.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 w-2/4 ml-auto">
          <Button
            variant="secondary"
            onClick={() => console.log("cancel button")}
          >
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={() => handleDelete(productId)}
            className="h-9 w-19"
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
