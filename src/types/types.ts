import { Product } from "./Product.types";

export interface IColumnsActions {
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export type ProductTableProps = {
  data: Product[];
  handleDeleteData: (id: string) => void;
};
