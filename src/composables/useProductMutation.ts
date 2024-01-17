// useProductMutation.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '@/api';
import type { PostProduct } from '@/lib/validators/productValidator';
import QUERY_KEY from '@/constant/queryKey';

const useProductMutation = (productId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostProduct) => {
      return productId ? api.updateProduct(payload, productId) : api.createProduct(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
    },
  });
};

export default useProductMutation;
