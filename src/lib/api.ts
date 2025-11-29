import {
  Product,
  INewProduct,
  IUpdateHTTP,
  IUserCredentialsProps,
} from "@/types/Product.types";

const API_URL =
  "https://proyecto-final-git-develop-emiliano-agustins-projects.vercel.app/";

export const api = {
  async getAllproducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.map((product: Product) => ({
      ...product,
    }));
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch product");
    const product = await response.json();
    return {
      ...product,
    };
  },

  async createProduct(data: INewProduct): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to create product");
    const newProduct = await response.json();
    return newProduct.data;
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete product");
  },

  async updateProduct({ id, data }: IUpdateHTTP): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    const updatedProduct = await response.json();
    return updatedProduct.data;
  },

  async login({ email, password }: IUserCredentialsProps): Promise<string> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to login user");
    const user = await response.json();
    return user;
  },

  async register({
    email,
    password,
  }: IUserCredentialsProps): Promise<{ id: string; email: string }> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to create product");
    const user = await response.json();
    return user.data;
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to logout");
  },
};
