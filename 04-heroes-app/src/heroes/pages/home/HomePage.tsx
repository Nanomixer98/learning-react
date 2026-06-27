import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import { CustomBreadcrumbs } from "../../../components/custom/CustomBreadcrumbs";
import { CustomJumpbotron } from "../../../components/custom/CustomJumpbotron";
import { CustomPagination } from "../../../components/custom/CustomPagination";
import { HeroGrid } from "../../components/HeroGrid";
import { HeroStats } from "../../components/HeroStats";
import { FavoriteHeroContext } from "../../context/FavoriteHeroContext";
import { useHeroSummary } from "../../hooks/useHeroSummary";
import { usePaginatedHero } from "../../hooks/usePaginatedHero";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summaryData } = useHeroSummary();

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
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                prev.set("page", "1");
                prev.set("category", "all");
                return prev;
              })
            }
          >
            All Characters ({summaryData?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                return prev;
              })
            }
          >
            <Heart className="h-4 w-4" />
            Favorites ({favoriteCount})
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                prev.set("page", "1");
                prev.set("category", "hero");
                return prev;
              })
            }
          >
            Heroes ({summaryData?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                prev.set("page", "1");
                prev.set("category", "villain");
                return prev;
              })
            }
          >
            Villains ({summaryData?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="favorites">
          <h1>favorites</h1>
          <HeroGrid heroes={favorites ?? []} />
        </TabsContent>
        <TabsContent value="heroes">
          <h1>heroes</h1>
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="villains">
          <h1>villains</h1>
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {selectedTab !== "favorites" && (
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      )}
    </>
  );
};
