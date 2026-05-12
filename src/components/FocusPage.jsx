import styles from './FocusPage.module.css'

export default function FocusPage({
  tasks, activeId, setActiveId, activeTask,
  isFocus, focusSecs, distCount, fmt,
  startSessionWithTask, endSessionFinal, completeTask,
}) {
  const pending = tasks.filter(t => !t.done)
  const m = String(Math.floor(focusSecs / 60)).padStart(2, '0')
  const s = String(focusSecs % 60).padStart(2, '0')

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.heading}>Focus Mode</h2>
          <p className={styles.sub}>Deep work, distraction-free</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left — main focus panel */}
        <div className={styles.mainPanel}>
          {!isFocus ? (
            <>
              <div className={styles.idleHero}>
                <div className={styles.heroIcon}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="14" stroke="var(--indigo)" strokeWidth="1.5"/>
                    <path d="M18 10v8l5 5" stroke="var(--indigo)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className={styles.heroTitle}>Ready to focus?</h3>
                <p className={styles.heroDesc}>
                  {activeTask
                    ? `You've selected "${activeTask.name}". Hit Start Focus to begin your session.`
                    : 'Select a task from the list on the right, then start your session.'}
                </p>
                {activeTask && (
                  <button
                    className={styles.startBtn}
                    onClick={() => startSessionWithTask(activeTask)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <polygon points="4,2 14,8 4,14" fill="currentColor"/>
                    </svg>
                    Start Focus Session
                  </button>
                )}
              </div>

              {/* HCI principle callouts */}
              <div className={styles.principleGrid}>
                {[
                  { icon: '👁', title: 'Visibility', desc: 'System status always visible in the top bar' },
                  { icon: '🧠', title: 'Cognitive Load', desc: 'Interface simplifies to one task during focus' },
                  { icon: '🔔', title: 'Feedback', desc: 'Gentle nudge after 8 minutes of inactivity' },
                  { icon: '🎛', title: 'User Control', desc: 'Resume, pause, or end — always your choice' },
                ].map(p => (
                  <div key={p.title} className={styles.principleCard}>
                    <span className={styles.principleIcon}>{p.icon}</span>
                    <span className={styles.principleTitle}>{p.title}</span>
                    <span className={styles.principleDesc}>{p.desc}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Active session view */}
              <div className={styles.activeHero}>
                <div className={styles.liveBadge}>
                  <span className={styles.liveDot} /> Live Session
                </div>
                <div className={styles.bigTimer}>{m}:{s}</div>
                <div className={styles.activeTaskName}>{activeTask?.name}</div>
              </div>

              <div className={styles.liveStatRow}>
                <div className={styles.liveStat}>
                  <span className={styles.liveVal}>{m}:{s}</span>
                  <span className={styles.liveLbl}>Focus time</span>
                </div>
                <div className={styles.liveStatDivider} />
                <div className={styles.liveStat}>
                  <span className={styles.liveVal}>{distCount}</span>
                  <span className={styles.liveLbl}>Distractions</span>
                </div>
                <div className={styles.liveStatDivider} />
                <div className={styles.liveStat}>
                  <span className={styles.liveVal} style={{color: distCount === 0 ? 'var(--green)' : distCount < 3 ? 'var(--amber)' : 'var(--red)'}}>
                    {distCount === 0 ? 'Clean' : distCount < 3 ? 'OK' : 'High'}
                  </span>
                  <span className={styles.liveLbl}>Focus quality</span>
                </div>
              </div>

              <div className={styles.actionRow}>
                <button className={styles.completeBtn} onClick={completeTask}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Mark Complete
                </button>
                <button className={styles.endBtn} onClick={() => endSessionFinal(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="4" y="4" width="8" height="8" rx="1" fill="currentColor"/>
                  </svg>
                  End Session
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right — task picker */}
        <div className={styles.taskPicker}>
          <div className={styles.pickerHeader}>
            <span className={styles.pickerTitle}>Select a Task</span>
            <span className={styles.pickerCount}>{pending.length} pending</span>
          </div>
          {pending.length === 0 && (
            <div className={styles.pickerEmpty}>All tasks completed! 🎉</div>
          )}
          {pending.map(task => (
            <div
              key={task.id}
              className={`${styles.pickerItem} ${activeId === task.id ? styles.pickerActive : ''}`}
              onClick={() => setActiveId(task.id)}
            >
              <div className={`${styles.pickerDot} ${activeId === task.id ? styles.pickerDotOn : ''}`} />
              <span className={styles.pickerName}>{task.name}</span>
              {activeId === task.id && <span className={styles.pickerBadge}>Selected</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
