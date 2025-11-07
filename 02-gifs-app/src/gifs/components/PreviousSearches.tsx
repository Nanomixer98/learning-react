import type { FC } from 'react';

interface Props {
  searches: string[];
  onLabelClick: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClick }) => {
  return (
    <div className="previous-searches">
      <h2>Previous Searches</h2>
      <ul className="previous-searches-list">
        {searches.map((item) => (
          <li key={item} onClick={() => onLabelClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
