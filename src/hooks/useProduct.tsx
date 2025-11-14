import {
  useQuery,
  useQueryClient,
  useMutation,
  UseQueryResult,
} from "@tanstack/react-query";
import { Product } from "@/types/Product.types";
import { api } from "@/lib/api";

export function useProducts() {
  const queryClient = useQueryClient();

  const queryAllProducts = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: api.getAllproducts,
    staleTime: 6000,
  });

  const createProduct = useMutation({
    mutationFn: api.createProduct,
    onSuccess: (newProduct: Product) => {
      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) => [
        ...oldProducts,
        newProduct,
      ]);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: api.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products: queryAllProducts.data,
    isLoading: queryAllProducts.isLoading,
    error: queryAllProducts.error,
    createProduct: createProduct.mutate,
    deleteProduct: deleteProduct.mutate,
    isCreating: createProduct.isPending,
    isDeleting: deleteProduct.isPending,
  };
}

export function useProduct(id: string): UseQueryResult<Product, Error> {
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProductById(id),
    staleTime: 6000,
  });

  return data;
}
