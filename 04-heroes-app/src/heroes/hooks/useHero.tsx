import { useQuery } from '@tanstack/react-query';
import { getHeroAction } from '../actions/get-hero.action';

export const useHero = (isSlug: string) => {
  return useQuery({
    queryKey: ['hero', { isSlug }],
    queryFn: () => getHeroAction(isSlug),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
