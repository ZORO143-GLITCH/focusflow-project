import styles from './NudgeModal.module.css'

export default function NudgeModal({ open, activeTask, onResume, onPause, onEnd }) {
  if (!open) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="11" stroke="var(--indigo)" strokeWidth="1.5"/>
            <path d="M14 8v6l4 4" stroke="var(--indigo)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className={styles.title}>Still there?</h3>
        <p className={styles.sub}>
          {activeTask
            ? `You've been idle. Ready to get back to "${activeTask.name}"?`
            : "You've been idle for a while. Ready to resume your session?"}
        </p>
        <div className={styles.actions}>
          <button className={styles.resume} onClick={onResume}>Resume Focus</button>
          <button className={styles.pause}  onClick={onPause}>Pause Session</button>
          <button className={styles.end}    onClick={onEnd}>End Session</button>
        </div>
        <p className={styles.hint}>This nudge was triggered by idle detection — an HCI feature of FocusFlow</p>
      </div>
    </div>
  )
}
