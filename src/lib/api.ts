import { Product, INewProduct, IUpdateHTTP } from "@/types/Product.types";

const API_URL = "http://localhost:8080/api/products";

export const api = {
  async getAllproducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.map((product: Product) => ({
      ...product,
    }));
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const product = await response.json();
    return {
      ...product,
    };
  },

  async createProduct(data: INewProduct): Promise<Product> {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    if (!response.ok) throw new Error("Failed to create product");
    const newProduct = await response.json();
    return newProduct.data;
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
  },

  async updateProduct({ id, data }: IUpdateHTTP): Promise<Product> {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    if (!response.ok) throw new Error("Failed to delete product");
    const updatedProduct = await response.json();
    return updatedProduct.data;
  },
};
