import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { RiikonDataProvider } from './contexts/RiikonDataContext'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutUsPage from './pages/AboutUsPage'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500) 
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeProvider>
      <RiikonDataProvider>
        {loading ? (
          <LoadingScreen progress={progress} />
        ) : (
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
              </Routes>
            </Layout>
          </Router>
        )}
      </RiikonDataProvider>
    </ThemeProvider>
  )
}

export default App
