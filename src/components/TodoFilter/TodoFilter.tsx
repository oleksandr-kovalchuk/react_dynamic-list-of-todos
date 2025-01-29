import React, { useCallback } from 'react';

type Props = {
  currentFilter: string;
  setFilter: (filter: string) => void;
  query: string;
  setQuery: (q: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  currentFilter,
  setFilter,
  query,
  setQuery,
}) => {
  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery],
  );

  const clearQuery = useCallback(() => {
    setQuery('');
  }, [setQuery]);

  return (
    <form className="field has-addons">
      {/* Filter Dropdown */}
      <p className="control">
        <span className="select">
          <select
            value={currentFilter}
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      {/* Search Input */}
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
