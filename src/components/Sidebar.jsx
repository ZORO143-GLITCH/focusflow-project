import styles from './Sidebar.module.css'

const NAV = [
  {
    id: 'tasks', label: 'Tasks',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/><rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor"/><rect x="2" y="13" width="7" height="2" rx="1" fill="currentColor"/></svg>
  },
  {
    id: 'focus', label: 'Focus',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.5v3.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    id: 'analytics', label: 'Analytics',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="10" width="3" height="6" rx="1" fill="currentColor"/><rect x="7.5" y="6" width="3" height="10" rx="1" fill="currentColor"/><rect x="13" y="2" width="3" height="14" rx="1" fill="currentColor"/></svg>
  },
]

export default function Sidebar({ page, setPage, isFocus }) {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#6366F1" strokeWidth="1.5"/>
            <path d="M9 5v4l2.5 2.5" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>FocusFlow</span>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <span className={styles.navLabel}>Menu</span>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${page === item.id ? styles.active : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
            {item.id === 'focus' && isFocus && <span className={styles.activeDot} />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.footerCard}>
          <span className={styles.footerTitle}>HCI Project</span>
          <span className={styles.footerSub}>Academic Year 2026</span>
        </div>
      </div>
    </aside>
  )
}
