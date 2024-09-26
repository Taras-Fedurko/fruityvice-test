import { useQuery } from '@tanstack/react-query';

import { Fruit } from '../types';
import { api } from './apiClient';

const fetchFruits = async () => {
  const response = await api.get<Fruit[]>('/fruit/all');
  return response.data;
};

export const useFruitQuery = () => {
  return useQuery({
    queryKey: ['fruits'],
    queryFn: fetchFruits,
    staleTime: Infinity,
    gcTime: Infinity,
    throwOnError: true,
  });
};
