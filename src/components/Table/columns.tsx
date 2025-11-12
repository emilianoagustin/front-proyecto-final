"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/Product.types";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categories",
    header: "Categories",
  },
];
