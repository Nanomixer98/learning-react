import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '../actions/search-heroes.actions';

export const useSearchHeroes = ({ ...options }) => {
  return useQuery({
    queryKey: ['heroes', 'search', { options }],
    queryFn: () => searchHeroesAction(options),
    staleTime: 1000 * 60 * 5,
  });
};
