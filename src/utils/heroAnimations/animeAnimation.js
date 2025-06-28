import gsap from 'gsap';

export default function initAnimeAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create floating anime-style particles
  const particleCount = 40;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create glowing particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'anime-particle';
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size and color
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random colors
      const hue = Math.floor(Math.random() * 360);
      particle.style.backgroundColor = `hsla(${hue}, 80%, 70%, ${Math.random() * 0.5 + 0.5})`;
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px hsla(${hue}, 80%, 70%, 0.8)`;
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate particles
    const particles = particlesRef.current.children;
    gsap.to([...particles], {
      y: () => gsap.utils.random(-80, 80),
      x: () => gsap.utils.random(-80, 80),
      scale: () => gsap.utils.random(0.8, 1.5),
      duration: () => gsap.utils.random(3, 7),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1
    });
  }
  
  // Title animation
  if (titleRef.current) {
    // Entry animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
    
    // Add a gradient text effect
    titleRef.current.style.background = 'linear-gradient(45deg, #ff5e9e, #6159ff, #4eb0ff)';
    titleRef.current.style.webkitBackgroundClip = 'text';
    titleRef.current.style.backgroundClip = 'text';
    titleRef.current.style.color = 'transparent';
    
    // Floating animation
    gsap.to(titleRef.current, {
      y: 8,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
    
    // Glow pulse
    gsap.to(titleRef.current, {
      textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(150, 100, 255, 0.6)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
    );
    
    // Subtle floating
    gsap.to(subtitleRef.current, {
      y: -5,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });
  }
  
  // Background animation
  if (heroRef.current) {
    gsap.to(heroRef.current, {
      backgroundPosition: '0% 20%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Return cleanup function
  return () => {
    gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current]);
    if (particlesRef.current) {
      gsap.killTweensOf(particlesRef.current.children);
    }
  };
}