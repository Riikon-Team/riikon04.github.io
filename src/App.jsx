import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { RiikonDataProvider } from './contexts/RiikonDataContext'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutUsPage from './pages/AboutUsPage'
import gsap from 'gsap'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [loadingComplete, setLoadingComplete] = useState(false)
  const appContentRef = useRef(null)
  const loadingScreenRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        handleLoadingComplete()
      }, 500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const handleLoadingComplete = () => {
    setLoadingComplete(true)
    
    gsap.to(loadingScreenRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(loadingScreenRef.current, { display: 'none' })
      }
    })
    
    animateContentIn()
  }
  
  const animateContentIn = () => {
    if (appContentRef.current) {
      const tl = gsap.timeline()
      
      tl.fromTo(appContentRef.current, 
        { 
          opacity: 0,
          scale: 0.98,
          filter: 'blur(8px)'
        }, 
        { 
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power2.out",
          clearProps: "filter,transform,scale" // Clear properties after animation
        }
      )
      
      .fromTo('.section', 
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95,
          rotationX: 15
        }, 
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8, 
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "back.out(1.7)",
          clearProps: "transform,scale,rotationX" // Clear properties after animation
        }, "-=0.3")
      
      .fromTo('.interactive-element', 
        { 
          y: 20,
          opacity: 0
        }, 
        { 
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power1.out",
          clearProps: "transform" // Clear properties after animation
        }, "-=0.2")
    }
  }

  return (
    <ThemeProvider>
      <RiikonDataProvider>
        <div 
          ref={appContentRef} 
          className="app-content"
          style={{ 
            opacity: 0,
            transform: 'scale(0.98)',
            filter: 'blur(8px)'
            // Removed transition: none to prevent it from affecting animations
          }}
        >
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
              </Routes>
            </Layout>
          </Router>
        </div>
        
        <div 
          ref={loadingScreenRef} 
          className="loading-screen-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            background: 'var(--bg-color)',
            willChange: 'transform, opacity'
          }}
        >
          <LoadingScreen 
            progress={progress} 
            onAnimationComplete={() => {}}
          />
        </div>
      </RiikonDataProvider>
    </ThemeProvider>
  )
}

export default App
