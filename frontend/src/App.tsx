import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout'
import { CanvasPage } from '@/pages/CanvasPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SeasonPage } from '@/pages/SeasonPage'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { KeyboardShortcuts } from '@/components/ui/KeyboardShortcuts'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<CanvasPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/season/:id" element={<SeasonPage />} />
      </Routes>
      <ToastContainer />
      <KeyboardShortcuts />
    </AppShell>
  )
}

export default App
