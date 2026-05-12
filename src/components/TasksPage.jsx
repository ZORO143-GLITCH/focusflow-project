import { useState } from 'react'
import styles from './TasksPage.module.css'

export default function TasksPage({ tasks, activeId, setActiveId, toggleDone, addTask, isFocus, startSessionWithTask }) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addTask(input)
    setInput('')
  }

  const pending   = tasks.filter(t => !t.done)
  const completed = tasks.filter(t => t.done)

  return (
    <div className={styles.page}>
      {/* Header row */}
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.heading}>My Tasks</h2>
          <p className={styles.sub}>{pending.length} pending · {completed.length} completed</p>
        </div>
        <div className={styles.addRow}>
          <input
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new task and press Enter…"
          />
          <button className={styles.addBtn} onClick={handleAdd}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Add task
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <StatPill label="Total"     value={tasks.length}     />
        <StatPill label="Pending"   value={pending.length}   color="amber" />
        <StatPill label="Done"      value={completed.length} color="green" />
        <StatPill label="Progress"  value={tasks.length ? Math.round(completed.length / tasks.length * 100) + '%' : '0%'} color="indigo" />
      </div>

      {/* Task grid */}
      <div className={styles.grid}>
        {/* Pending column */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <span className={styles.colDot} style={{ background: 'var(--amber)' }} />
            <span className={styles.colTitle}>Pending</span>
            <span className={styles.colCount}>{pending.length}</span>
          </div>
          {pending.length === 0 && (
            <div className={styles.empty}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="var(--subtle)" strokeWidth="1.5"/>
                <path d="M11 16l4 4 6-6" stroke="var(--subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>All tasks done!</span>
            </div>
          )}
          {pending.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isActive={activeId === task.id}
              onSelect={() => setActiveId(task.id)}
              onToggle={() => toggleDone(task.id)}
              onFocus={() => startSessionWithTask(task)}
              isFocus={isFocus}
            />
          ))}
        </div>

        {/* Completed column */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <span className={styles.colDot} style={{ background: 'var(--green)' }} />
            <span className={styles.colTitle}>Completed</span>
            <span className={styles.colCount}>{completed.length}</span>
          </div>
          {completed.length === 0 && (
            <div className={styles.empty}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="var(--subtle)" strokeWidth="1.5"/>
                <path d="M16 10v6l3 3" stroke="var(--subtle)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>No completed tasks yet</span>
            </div>
          )}
          {completed.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isActive={false}
              onSelect={() => {}}
              onToggle={() => toggleDone(task.id)}
              isFocus={isFocus}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div className={`${styles.statPill} ${color ? styles[color] : ''}`}>
      <span className={styles.statVal}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function TaskCard({ task, isActive, onSelect, onToggle, onFocus, isFocus }) {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''} ${task.done ? styles.cardDone : ''}`}
      onClick={onSelect}
    >
      <div className={styles.cardLeft}>
        <div
          className={`${styles.check} ${task.done ? styles.checked : ''}`}
          onClick={e => { e.stopPropagation(); onToggle() }}
        >
          {task.done && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className={styles.cardInfo}>
          <span className={`${styles.cardName} ${task.done ? styles.struck : ''}`}>{task.name}</span>
          <span className={styles.cardStatus}>{task.done ? 'Completed' : isActive ? 'Selected for focus' : 'Pending'}</span>
        </div>
      </div>
      {!task.done && onFocus && !isFocus && (
        <button
          className={styles.focusQuickBtn}
          onClick={e => { e.stopPropagation(); onFocus() }}
          title="Start focus on this task"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <polygon points="2,1.5 11,6.5 2,11.5" fill="currentColor"/>
          </svg>
          Focus
        </button>
      )}
      {isActive && !task.done && (
        <span className={styles.activeBadge}>Active</span>
      )}
    </div>
  )
}
