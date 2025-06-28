import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './HeroSection.css';
import { getSeasonalTheme } from '../utils/dateUtils';
import { 
  initCodingAnimation, 
  initAnimeAnimation,
  initCloudAnimation,
  initChristmasAnimation,
  initHalloweenAnimation,
  initLunarNewYearAnimation,
  initAutumnAnimation,
  initSummerAnimation,
  initNationalDayAnimation,
  initMidAutumnAnimation
} from '../utils/heroAnimations';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage, 
  type = 'image', 
  videoUrl,
  videoOptions = { autoPlay: true, muted: true, loop: true },
  animationStyle = null,
  animationEnabled = true
}) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);
  const particlesRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(null);
  
  // Determine current theme based on animationStyle
  useEffect(() => {
    if (!animationEnabled || !animationStyle) {
      setCurrentTheme(null);
      return;
    }
    
    if (animationStyle === 'auto') {
      setCurrentTheme(getSeasonalTheme());
    } else {
      setCurrentTheme(animationStyle);
    }
  }, [animationStyle, animationEnabled]);

  // Initialize appropriate animations when theme changes
  useEffect(() => {
    if (!animationEnabled || !currentTheme || !heroRef.current) return;
    
    // Clear any existing animations
    gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current, overlayRef.current]);
    if (particlesRef.current) particlesRef.current.innerHTML = '';
    
    // Initialize theme animations
    const themeProps = {
      heroRef,
      titleRef, 
      subtitleRef, 
      overlayRef,
      particlesRef,
      title,
      subtitle
    };
    
    let cleanup = null;
    
    switch (currentTheme) {
      case 'coding':
        cleanup = initCodingAnimation(themeProps);
        break;
      case 'anime':
        cleanup = initAnimeAnimation(themeProps);
        break;
      case 'cloud':
        cleanup = initCloudAnimation(themeProps);
        break;
      case 'christmas':
        cleanup = initChristmasAnimation(themeProps);
        break;
      case 'halloween':
        cleanup = initHalloweenAnimation(themeProps);
        break;
      case 'lunar-new-year':
        cleanup = initLunarNewYearAnimation(themeProps);
        break;
      case 'autumn':
        cleanup = initAutumnAnimation(themeProps);
        break;
      case 'summer':
        cleanup = initSummerAnimation(themeProps);
        break;
      case 'national-day':
        cleanup = initNationalDayAnimation(themeProps);
        break;
      case 'mid-autumn':
        cleanup = initMidAutumnAnimation(themeProps);
        break;
      default:
        break;
    }
    
    return () => {
      // Clean up animations
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
      
      gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current, overlayRef.current]);
      if (particlesRef.current) particlesRef.current.innerHTML = '';
    };
  }, [currentTheme, animationEnabled, title, subtitle]);

  return (
    <div 
      ref={heroRef}
      className={`hero-section ${currentTheme ? `theme-${currentTheme}` : ''}`}
      style={type === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {type === 'video' && videoUrl && (
        <video
          className="hero-video-background"
          autoPlay={videoOptions.autoPlay}
          muted={videoOptions.muted}
          loop={videoOptions.loop}
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      <div ref={overlayRef} className="hero-overlay"></div>
      
      {currentTheme && (
        <div ref={particlesRef} className="hero-particles"></div>
      )}
      
      <div className="hero-content">
        <h1 ref={titleRef}>{title}</h1>
        <p ref={subtitleRef}>{subtitle}</p>
      </div>
    </div>
  );
}

export default HeroSection;
