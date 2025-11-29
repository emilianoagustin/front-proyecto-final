"use client";

import { useProducts } from "@/hooks/useProduct";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus, Pencil } from "lucide-react";
import { ProductForm } from "@/components/Form/product-form";
import { DeleteButton } from "@/components/DeleteButton/delete-product-button";

export function ProductTable() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Create Product <CirclePlus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="Create new product form">
            <DialogHeader>
              <DialogTitle>Create a new product</DialogTitle>
              <DialogDescription>
                Add a new product to the database
              </DialogDescription>

              <ProductForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of your products in stock.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.categories.toString().replace(/,/g, " - ")}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <Pencil className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="Update product form">
                      <DialogHeader>
                        <DialogTitle>Update product</DialogTitle>
                        <ProductForm product={product} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <DeleteButton productId={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
