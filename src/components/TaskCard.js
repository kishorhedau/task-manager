import React from 'react';

const priorityColor = {
  High:   { bg: '#ff4d4d22', border: '#ff4d4d', text: '#ff4d4d' },
  Medium: { bg: '#ffaa0022', border: '#ffaa00', text: '#ffaa00' },
  Low:    { bg: '#00cc8822', border: '#00cc88', text: '#00cc88' },
};

function TaskCard({ task, onToggle, onDelete }) {
  const today = new Date().toISOString().split('T')[0];
  const pc = priorityColor[task.priority];
  const isOverdue = task.due && task.due < today && !task.done;

  return (
    <div className={`task-card ${task.done ? 'done' : ''}`}>
      {/* Checkbox */}
      <div
        className={`checkbox ${task.done ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        style={task.done ? {} : { borderColor: pc.border }}
      >
        {task.done && '✓'}
      </div>

      {/* Task Content */}
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          {/* Priority Badge */}
          <span
            className="badge"
            style={{ background: pc.bg, color: pc.text, border: `1px solid ${pc.border}` }}
          >
            {task.priority}
          </span>

          {/* Category Badge */}
          <span className="badge badge-cat">{task.category}</span>

          {/* Due Date */}
          {task.due && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              {isOverdue ? '⚠ ' : ''}Due {task.due}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </div>
  );
}

export default TaskCard;
