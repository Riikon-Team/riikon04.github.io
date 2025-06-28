import gsap from 'gsap';

export default function initLunarNewYearAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create floating lanterns and fireworks
  const particleCount = 50;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'lunar-new-year-particle';
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Create lanterns and fireworks
      if (Math.random() > 0.7) {
        // Lanterns
        particle.innerHTML = '🏮';
        particle.style.fontSize = `${Math.random() * 20 + 20}px`;
      } else {
        // Firework sparkles
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = Math.random() > 0.5 ? '#ffdf00' : '#ff0000';
        particle.style.boxShadow = `0 0 10px ${Math.random() > 0.5 ? '#ffdf00' : '#ff0000'}`;
      }
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate particles
    const particles = particlesRef.current.children;
    [...particles].forEach(particle => {
      if (particle.innerHTML === '🏮') {
        // Floating lanterns
        gsap.to(particle, {
          y: `-=${Math.random() * 100 + 50}`,
          x: `+=${Math.random() * 30 - 15}`,
          rotation: Math.random() * 10 - 5,
          duration: Math.random() * 20 + 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      } else {
        // Sparkling fireworks
        gsap.to(particle, {
          scale: Math.random() * 2 + 1,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          repeatDelay: Math.random() * 3,
          ease: "power1.out",
          onRepeat: function() {
            gsap.set(particle, { 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 60}%`,
              opacity: 1,
              scale: 0.3
            });
          }
        });
      }
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#ffdf00';
    titleRef.current.style.textShadow = '0 0 10px rgba(255, 223, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "elastic.out(1, 0.5)" 
      }
    );
    
    // Gold shimmer effect
    gsap.to(titleRef.current, {
      textShadow: '0 0 20px rgba(255, 223, 0, 0.9), 0 0 30px rgba(255, 0, 0, 0.7)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#ff3838';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)", delay: 0.4 }
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