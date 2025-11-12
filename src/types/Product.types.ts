import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  price: number;
  categories: string[];
};

export interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
