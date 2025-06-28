import gsap from 'gsap';

export default function initChristmasAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create falling snowflakes
  const particleCount = 150;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create snowflake particles
    for (let i = 0; i < particleCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'christmas-particle';
      
      // Random positions
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.top = `-${Math.random() * 10 + 5}%`;
      
      // Random size
      const size = Math.random() * 10 + 4;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.borderRadius = '50%';
      snowflake.style.backgroundColor = 'white';
      snowflake.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
      
      particlesRef.current.appendChild(snowflake);
    }
    
    // Animate snowflakes
    const snowflakes = particlesRef.current.children;
    [...snowflakes].forEach(snowflake => {
      // Random horizontal drift
      const xDrift = Math.random() * 100 - 50; // -50 to +50
      
      gsap.to(snowflake, {
        y: '105vh',
        x: `+=${xDrift}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5,
        onRepeat: function() {
          gsap.set(snowflake, { 
            y: '-5vh', 
            x: `${Math.random() * 100}%`,
          });
        }
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#e91eceff';
    titleRef.current.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.5)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );
    
    // Gentle bobbing animation
    gsap.to(titleRef.current, {
      y: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#4eeaa9ff';
    subtitleRef.current.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.3 }
    );
  }
  
  // Return cleanup function
  return () => {
    gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current]);
    if (particlesRef.current) {
      gsap.killTweensOf(particlesRef.current.children);
    }
  };
}