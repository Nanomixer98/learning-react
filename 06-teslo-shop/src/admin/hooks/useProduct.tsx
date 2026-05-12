import type { Product } from "@/interfaces/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { getProductByIdAction } from "../actions/get-product-by-id.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      // Update queryData
      queryClient.setQueryData(["product", { id: product.id }], product);
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  return {
    ...query,
    mutation,
  };
};
