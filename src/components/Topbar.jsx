import styles from './Topbar.module.css'

export default function Topbar({ isFocus, focusSecs, activeTask, fmt, onToggleFocus }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h1 className={styles.pageTitle}>
          {isFocus ? 'Focus Session' : 'Task Manager'}
        </h1>
        {isFocus && activeTask && (
          <span className={styles.activeTaskPill}>
            <span className={styles.dot} />
            {activeTask.name}
          </span>
        )}
      </div>
      <div className={styles.right}>
        {isFocus && (
          <div className={styles.timerChip}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6.5 3.5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {fmt(focusSecs)}
          </div>
        )}
        <button
          className={`${styles.focusBtn} ${isFocus ? styles.focusOn : ''}`}
          onClick={onToggleFocus}
        >
          {isFocus ? (
            <>
              <span className={styles.btnDot} />
              End Session
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <polygon points="3,2 11,6.5 3,11" fill="currentColor"/>
              </svg>
              Start Focus
            </>
          )}
        </button>
      </div>
    </header>
  )
}
