import React from 'react';

function FilterBar({ filter, setFilter, categories }) {
  const filters = ['All', 'Active', 'Completed', ...categories];

  return (
    <div className="filters">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
