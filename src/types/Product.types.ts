export type Product = {
  id: string;
  name: string;
  price: string;
  categories: string[];
};

export interface INewProduct {
  name: string;
  price: string;
  categories: string[];
}

export type ProductTableProps = {
  data: Product[];
  handleDeleteData: (id: string) => void;
};

export interface IUpdateHTTP {
  id: string;
  data: INewProduct;
}

export interface IDeleteButtonProps {
  productId: string;
}

export interface IFormProps {
  product?: Product;
}

export interface IUserCredentialsProps {
  email: string;
  password: string;
}
