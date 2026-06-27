import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Slider } from "../../../../components/ui/slider";

export const SearchControls = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAdvanceSearchParam = queryParams.get("activeAdvanceSearch") ?? "";
  const strengthParam = Number(queryParams.get("strength") ?? "0");

  const setNewQueryParam = (name: string, value: string) => {
    queryParams.set(name, value);
    setQueryParams(queryParams);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const value = inputRef.current?.value ?? "";
    setNewQueryParam("name", value);
  };

  const handleAdvanceFilters = () => {
    if (activeAdvanceSearchParam === "advance-filters") {
      queryParams.delete("activeAdvanceSearch");
      setQueryParams(queryParams);
      return;
    }
    setNewQueryParam("activeAdvanceSearch", "advance-filters");
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg bg-white"
            onKeyDown={handleKeyDown}
            defaultValue={queryParams.get("name") ?? ""}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={
              activeAdvanceSearchParam === "advance-filters"
                ? "default"
                : "outline"
            }
            className="h-12"
            onClick={handleAdvanceFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        value={activeAdvanceSearchParam}
        data-testid="accordion"
      >
        <AccordionItem value="advance-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost">Clear All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All teams
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All categories
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All universes
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All statuses
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Minimum Strength: {strengthParam}/10
                </label>
                <Slider
                  className="my-2"
                  defaultValue={[strengthParam]}
                  onValueChange={(value) =>
                    setNewQueryParam("strength", value[0].toString())
                  }
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
