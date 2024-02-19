import { useMutation, useQuery, useQueryClient, useIsMutating } from '@tanstack/vue-query';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';
import { useToast } from '@/components/ui/toast';

const useCart = () => {
  const queryClient = useQueryClient();
  const isMutating = useIsMutating();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.CARTS],
    queryFn: async () => (await api.customer.cart.getCarts()).data.data,
  });

  const addCartMutation = useMutation({
    mutationFn: async ({ id, count }: { id: string; count: number }) => await api.customer.cart.postCart(id, count),
    onMutate: () => {
      queryClient.cancelQueries({
        queryKey: [QUERY_KEY.CARTS],
      });

      const previousCarts = queryClient.getQueryData([QUERY_KEY.CARTS]);
      return { previousCarts };
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData([QUERY_KEY.CARTS], context.previousCarts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] });
    },
    onSuccess: (res) => {
      const title = res.data.data.product.title;

      toast({ title: title + ' 已加入購物車' });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ cartId, productId, qty }: { cartId: string; productId: string; qty: number }) =>
      api.customer.cart.updateCart(cartId, productId, qty),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
  });

  const removeCartMutation = useMutation({
    mutationFn: api.customer.cart.deleteCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
  });

  const removeAllCartsMutation = useMutation({
    mutationFn: api.customer.cart.deleteAllCarts,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.CARTS] });

      const previousData = queryClient.getQueryData([QUERY_KEY.CARTS]);

      queryClient.setQueryData([QUERY_KEY.CARTS], { carts: [] });

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.CARTS], context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
  });

  return {
    data,
    isMutating,
    addCartMutation,
    updateCartMutation,
    removeCartMutation,
    removeAllCartsMutation,
  };
};

export default useCart;
