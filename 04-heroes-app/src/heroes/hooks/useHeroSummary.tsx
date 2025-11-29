import { useQuery } from '@tanstack/react-query';
import { getSumamryAction } from '../actions/get-summary.action';

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ['summary-information'],
    queryFn: getSumamryAction,
    staleTime: 1000 * 60 * 5,
  });
};
