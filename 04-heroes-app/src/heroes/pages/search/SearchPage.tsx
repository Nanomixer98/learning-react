import { CustomBreadcrumbs } from '../../../components/custom/CustomBreadcrumbs';
import { CustomJumpbotron } from '../../../components/custom/CustomJumpbotron';
import { HeroStats } from '../../components/HeroStats';
import { SearchControls } from './components/SearchControls';

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
