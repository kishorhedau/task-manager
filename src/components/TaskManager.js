import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import StatsRow from './StatsRow';
import './TaskManager.css';

const CATEGORIES = ['Work', 'Personal', 'Study', 'Shopping'];

const initialTasks = [
  { id: 1, title: 'Learn ReactJS hooks', category: 'Study', priority: 'High', due: '2026-05-10', done: false },
  { id: 2, title: 'Build portfolio project', category: 'Work', priority: 'High', due: '2026-05-08', done: false },
  { id: 3, title: 'Practice JavaScript ES6+', category: 'Study', priority: 'Medium', due: '2026-05-12', done: true },
];

function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');

  // Add a new task
  const addTask = (newTask) => {
    setTasks([{ id: Date.now(), ...newTask, done: false }, ...tasks]);
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.done;
    if (filter === 'Completed') return t.done;
    if (CATEGORIES.includes(filter)) return t.category === filter;
    return true;
  });

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Task Manager</h1>
        <p>Stay organized. Ship faster.</p>
      </div>

      {/* Stats */}
      <StatsRow
        total={tasks.length}
        pending={tasks.filter((t) => !t.done).length}
        completed={completed}
        progress={progress}
      />

      {/* Add Task Form */}
      <TaskForm onAdd={addTask} categories={CATEGORIES} />

      {/* Filter Buttons */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        categories={CATEGORIES}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default TaskManager;
