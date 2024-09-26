import { useQuery } from '@tanstack/react-query';

import { mockAllFruits } from './__mock__';
import { Fruit } from '../types';
import { api } from './apiClient';

const fetchFruits = async () => {
  // just simple helper. Will remove later
  if (window.location.host.startsWith('localhost')) {
    return new Promise<Fruit[]>((res, rej) => {
      rej(new Error('qwefqw'));

      setTimeout(() => res(mockAllFruits), 1000);
    });
  }
 
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
