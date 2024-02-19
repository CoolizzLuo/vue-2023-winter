import type { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';

const useProductQuery = (productId: Ref<string | null>) => {
  return useQuery({
    queryKey: [QUERY_KEY.PRODUCT, productId],
    queryFn: async () => {
      if (productId.value) {
        return (await api.customer.products.getProductById(productId.value)).data.product;
      } else {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export default useProductQuery;
