import { useMutation, useQuery } from '@tanstack/vue-query';
import api from '@/api';

export const useAuth = () => useMutation({ mutationFn: api.login })

