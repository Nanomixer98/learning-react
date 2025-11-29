import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { CustomBreadcrumbs } from '../../../components/custom/CustomBreadcrumbs';
import { CustomJumpbotron } from '../../../components/custom/CustomJumpbotron';
import { CustomPagination } from '../../../components/custom/CustomPagination';
import { HeroGrid } from '../../components/HeroGrid';
import { HeroStats } from '../../components/HeroStats';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'favorites' | 'heroes' | 'villains'
  >('all');

  return (
    <>
      {/* Header */}
      <CustomJumpbotron
        title="Heroes universe"
        description="Explore and search new superheroes"
      />

      <CustomBreadcrumbs currentPage="Super heroes" breadcrumbs={[]} />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setActiveTab('all')}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab('favorites')}
          >
            <Heart className="h-4 w-4" />
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab('villains')}
          >
            Villains (2)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <HeroGrid />
        </TabsContent>
        <TabsContent value="favorites">
          <h1>favorites</h1>
          <HeroGrid />
        </TabsContent>
        <TabsContent value="heroes">
          <h1>heroes</h1>
          <HeroGrid />
        </TabsContent>
        <TabsContent value="villains">
          <h1>villains</h1>
          <HeroGrid />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} />
    </>
  );
};
