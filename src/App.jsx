import { useState } from 'react'
import Sidebar      from './components/Sidebar'
import Topbar       from './components/Topbar'
import TasksPage    from './components/TasksPage'
import FocusPage    from './components/FocusPage'
import AnalyticsPage from './components/AnalyticsPage'
import NudgeModal   from './components/NudgeModal'
import { useFocusSession } from './hooks/useFocusSession'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('tasks')
  const session = useFocusSession()

  return (
    <div className={styles.layout}>
      <Sidebar page={page} setPage={setPage} isFocus={session.isFocus} />
      <div className={styles.main}>
        <Topbar
          isFocus={session.isFocus}
          focusSecs={session.focusSecs}
          activeTask={session.activeTask}
          fmt={session.fmt}
          onToggleFocus={() =>
            session.isFocus
              ? session.endSessionFinal(false)
              : session.startSessionWithTask(session.activeTask)
          }
        />
        <div className={styles.content}>
          {page === 'tasks'     && <TasksPage     {...session} />}
          {page === 'focus'     && <FocusPage      {...session} />}
          {page === 'analytics' && <AnalyticsPage  {...session} />}
        </div>
      </div>
      <NudgeModal
        open={session.nudgeOpen}
        activeTask={session.activeTask}
        onResume={session.resumeNudge}
        onPause={() => session.endSessionFinal(false)}
        onEnd={() => session.endSessionFinal(false)}
      />
    </div>
  )
}
