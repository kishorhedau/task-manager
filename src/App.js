import { useState } from "react";
import "./App.css";

const CATEGORIES = ["Work", "Personal", "Study", "Shopping"];
const PRIORITIES = ["High", "Medium", "Low"];

const priorityColor = {
  High: { bg: "#ff4d4d22", border: "#ff4d4d", text: "#ff4d4d" },
  Medium: { bg: "#ffaa0022", border: "#ffaa00", text: "#ffaa00" },
  Low: { bg: "#00cc8822", border: "#00cc88", text: "#00cc88" },
};

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn ReactJS hooks", category: "Study", priority: "High", due: "2026-05-10", done: false },
    { id: 2, title: "Build portfolio project", category: "Work", priority: "High", due: "2026-05-08", done: false },
    { id: 3, title: "Practice JavaScript ES6+", category: "Study", priority: "Medium", due: "2026-05-12", done: true },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!title.trim()) return;
    setTasks([
      { id: Date.now(), title: title.trim(), category, priority, due, done: false },
      ...tasks,
    ]);
    setTitle("");
    setDue("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const today = new Date().toISOString().split("T")[0];

  const filtered = tasks.filter((t) => {
    if (filter === "Active") return !t.done;
    if (filter === "Completed") return t.done;
    if (CATEGORIES.includes(filter)) return t.category === filter;
    return true;
  });

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="app">
      <div className="header">
        <h1>Task Manager</h1>
        <p>Stay organized. Ship faster.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="num">{tasks.length}</div>
          <div className="label">Total</div>
        </div>
        <div className="stat-card">
          <div className="num">{tasks.filter((t) => !t.done).length}</div>
          <div className="label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="num">{completed}</div>
          <div className="label">Done</div>
        </div>
        <div className="stat-card">
          <div className="num">{progress}%</div>
          <div className="label">Progress</div>
        </div>
      </div>

      <div className="add-form">
        <h2>New Task</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="input-wide"
          />
        </div>
        <div className="form-row">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          <button className="add-btn" onClick={addTask}>+ Add</button>
        </div>
      </div>

      <div className="filters">
        {["All", "Active", "Completed", ...CATEGORIES].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="icon">✦</div>
            <p>No tasks here. Add one!</p>
          </div>
        ) : (
          filtered.map((task) => {
            const pc = priorityColor[task.priority];
            const isOverdue = task.due && task.due < today && !task.done;
            return (
              <div key={task.id} className={`task-card ${task.done ? "done" : ""}`}>
                <div
                  className={`checkbox ${task.done ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                  style={task.done ? {} : { borderColor: pc.border }}
                >
                  {task.done && "✓"}
                </div>
                <div className="task-body">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span
                      className="badge"
                      style={{ background: pc.bg, color: pc.text, border: `1px solid ${pc.border}` }}
                    >
                      {task.priority}
                    </span>
                    <span className="badge badge-cat">{task.category}</span>
                    {task.due && (
                      <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
                        {isOverdue ? "⚠ " : ""}Due {task.due}
                      </span>
                    )}
                  </div>
                </div>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
              </div>
            );
          })
        )}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default App;
