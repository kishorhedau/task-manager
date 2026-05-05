import React, { useState } from 'react';

const PRIORITIES = ['High', 'Medium', 'Low'];

function TaskForm({ onAdd, categories }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [due, setDue] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category, priority, due });
    setTitle('');
    setDue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="add-form">
      <h2>New Task</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 2, minWidth: '200px' }}
        />
      </div>

      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />

        <button className="add-btn" onClick={handleAdd}>
          + Add
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
