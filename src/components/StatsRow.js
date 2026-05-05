import React from 'react';

function StatsRow({ total, pending, completed, progress }) {
  const stats = [
    { num: total, label: 'Total' },
    { num: pending, label: 'Pending' },
    { num: completed, label: 'Done' },
    { num: `${progress}%`, label: 'Progress' },
  ];

  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="num">{s.num}</div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsRow;
