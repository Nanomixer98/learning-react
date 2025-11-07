import { useState } from 'react';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import type { Gif } from './gifs/interfaces/gif.interface';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = (term: string) => {
    console.log('term clicked', term);
  };

  const handleSearch = async (query: string = '') => {
    query = query.toLocaleLowerCase().trim();

    if (query.length === 0) return;

    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms].slice(0, 7));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Gif Searcher"
        description="Find the best gifs to share"
      />

      {/* Search */}
      <SearchBar placeholder="Search for a gif" onQuery={handleSearch} />

      {/* Previous Searches */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClick={handleTermClicked}
      />

      {/* GIFS */}
      <GifList gifs={gifs} />
    </>
  );
};
