import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

function LoadingScreen({ progress, onAnimationComplete }) {
  const loadingScreenRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  const clipPathRender = (progress) => {
    const smoothWave = [];
    for (let i = 0; i <= 100; i += 2) {
      const waveHeight = Math.sin((i + progress * 2) * 0.2) * 5;
      smoothWave.push(`${i}% ${100 - progress + waveHeight}%`);
    }
    smoothWave.push('100% 100%', '0% 100%');
    
    return {
      clipPath: `polygon(${smoothWave.join(', ')})`
    }
  }

  useEffect(() => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        ...clipPathRender(progress),
        duration: 0.3,
        ease: "power1.out"
      });
    }
    
    // Start exit animation when progress reaches 100%
    if (progress >= 100 && loadingScreenRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        }
      });
      
      tl.to(loadingScreenRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.5
      });
    }
  }, [progress, onAnimationComplete]);

  return (
    <div className="loading-screen" ref={loadingScreenRef}>
      <div className="loading-content">
        <div className="logo-container" ref={textRef}>
          <h1 className="logo-text base-text">Riikon Team</h1>
          <div className="overlay-container">
            <h1 className="logo-text overlay-text" ref={overlayRef} style={clipPathRender(0)}>Riikon Team</h1>
          </div>
        </div>
        <div className="loading-indicator">
          <span className="loading-text">loading...</span>
          <span className="progress-percentage">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
