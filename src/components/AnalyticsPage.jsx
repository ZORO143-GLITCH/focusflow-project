import styles from './AnalyticsPage.module.css'

export default function AnalyticsPage({ totalFocusMins, totalDist, pctDone, avgScore, sessionHist, tasks }) {
  return (
    <div className={styles.page}>
      <div>
        <h2 className={styles.heading}>Analytics</h2>
        <p className={styles.sub}>Track your focus patterns and session history</p>
      </div>

      {/* Top stat cards */}
      <div className={styles.statGrid}>
        <StatCard value={`${totalFocusMins}m`} label="Total focus time"   sub="across all sessions" color="indigo" icon="⏱" />
        <StatCard value={totalDist}             label="Total distractions" sub="idle events triggered" color="amber" icon="⚡" />
        <StatCard value={`${pctDone}%`}         label="Tasks completed"   sub={`${tasks.filter(t=>t.done).length} of ${tasks.length} tasks`} color="green" icon="✓" />
        <StatCard value={avgScore ?? '—'}       label="Avg focus score"   sub="0–100 scale" color="purple" icon="★" />
      </div>

      {/* Score bar + history */}
      <div className={styles.lowerGrid}>
        {/* Score breakdown */}
        <div className={styles.scoreCard}>
          <div className={styles.scoreHeader}>
            <span className={styles.sectionTitle}>Session Score</span>
            <span className={styles.scoreVal}>{avgScore ?? '—'}<span className={styles.scoreMax}>/100</span></span>
          </div>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${avgScore ?? 0}%` }} />
          </div>
          <div className={styles.scoreBreakdown}>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownDot} style={{ background: 'var(--green)' }} />
              <span className={styles.breakdownLbl}>70–100 = Great focus</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownDot} style={{ background: 'var(--amber)' }} />
              <span className={styles.breakdownLbl}>40–69 = Moderate</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownDot} style={{ background: 'var(--red)' }} />
              <span className={styles.breakdownLbl}>0–39 = High distraction</span>
            </div>
          </div>
          <div className={styles.formulaBox}>
            <span className={styles.formulaLabel}>Score formula</span>
            <span className={styles.formula}>(focus_time / total_time) × 100 − (distractions × 8)</span>
          </div>
        </div>

        {/* Session history */}
        <div className={styles.histCard}>
          <div className={styles.histHeader}>
            <span className={styles.sectionTitle}>Session History</span>
            <span className={styles.histCount}>{sessionHist.length} sessions</span>
          </div>
          {sessionHist.length === 0 ? (
            <div className={styles.empty}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="var(--subtle)" strokeWidth="1.5"/>
                <path d="M20 12v8l5 5" stroke="var(--subtle)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>No sessions yet.</span>
              <span>Start your first focus session!</span>
            </div>
          ) : (
            <div className={styles.histList}>
              {sessionHist.map((s, i) => (
                <HistRow key={i} session={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label, sub, color, icon }) {
  return (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.statTop}>
        <span className={styles.statIcon}>{icon}</span>
        <span className={styles.statValue}>{value}</span>
      </div>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statSub}>{sub}</span>
    </div>
  )
}

function HistRow({ session }) {
  const color = session.score >= 70 ? 'var(--green)'
    : session.score >= 40 ? 'var(--amber)' : 'var(--red)'
  return (
    <div className={styles.histRow}>
      <div className={styles.histInfo}>
        <span className={styles.histTask}>{session.task}</span>
        <span className={styles.histMeta}>
          {session.time} · {Math.floor(session.focusSecs / 60)}m focused · {session.dist} distraction{session.dist !== 1 ? 's' : ''}
        </span>
      </div>
      <div className={styles.histRight}>
        <span className={styles.histScore} style={{ color }}>{session.score}</span>
        <span className={`${styles.histStatus} ${session.completed ? styles.done : styles.paused}`}>
          {session.completed ? 'completed' : 'paused'}
        </span>
      </div>
    </div>
  )
}
