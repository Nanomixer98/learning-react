import { useEffect, useState, type KeyboardEvent } from 'react';

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({
  placeholder = 'Search anything',
  onQuery,
}: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
    setQuery('');
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} disabled={!query.trim()}>
        Search
      </button>
    </div>
  );
};
