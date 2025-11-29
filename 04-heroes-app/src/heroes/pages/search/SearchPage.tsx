import { useSearchParams } from 'react-router';
import { CustomBreadcrumbs } from '../../../components/custom/CustomBreadcrumbs';
import { CustomJumpbotron } from '../../../components/custom/CustomJumpbotron';
import { HeroGrid } from '../../components/HeroGrid';
import { HeroStats } from '../../components/HeroStats';
import { useSearchHeroes } from '../../hooks/useSearchHeroes';
import { SearchControls } from './components/SearchControls';

export const SearchPage = () => {
  const [queryParams] = useSearchParams();
  const nameParam = queryParams.get('name') ?? '';
  const strengthParam = Number(queryParams.get('strength') ?? '0');

  const { data: filteredData = [] } = useSearchHeroes({
    name: nameParam,
    strength: strengthParam,
  });

  return (
    <>
      {/* Header */}
      <CustomJumpbotron
        title="Heroes Search"
        description="Explore and search new superheroes"
      />

      <CustomBreadcrumbs currentPage="Search superheroes" breadcrumbs={[]} />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls and Advanced Filters */}
      <SearchControls />

      {/* Hero grid */}
      <HeroGrid heroes={filteredData} />
    </>
  );
};

export default SearchPage;
