import gsap from 'gsap';

export default function initHalloweenAnimation({ heroRef, titleRef, subtitleRef, particlesRef, overlayRef }) {
  // Create floating spooky particles
  const particleCount = 30;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create spooky particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'halloween-particle';
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Make some circular and some ghost-shaped
      if (Math.random() > 0.7) {
        // Ghost shape
        particle.innerHTML = '👻';
        particle.style.fontSize = `${size + 5}px`;
      } else if (Math.random() > 0.5) {
        // Pumpkin
        particle.innerHTML = '🎃';
        particle.style.fontSize = `${size + 5}px`;
      } else {
        // Circular mist
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = `rgba(255, 165, 0, ${Math.random() * 0.2 + 0.1})`;
        particle.style.boxShadow = '0 0 15px rgba(255, 165, 0, 0.3)';
      }
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate particles
    const particles = particlesRef.current.children;
    [...particles].forEach(particle => {
      gsap.to(particle, {
        x: () => `${Math.random() * 100 - 50}`,
        y: () => `${Math.random() * 100 - 50}`,
        rotation: () => Math.random() * 360,
        opacity: () => Math.random() * 0.7 + 0.3,
        duration: () => Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }
  
  // Add a flickering effect to the overlay
  if (overlayRef && overlayRef.current) {
    gsap.to(overlayRef.current, {
      backgroundColor: 'rgba(30, 0, 0, 0.4)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "steps(3)"
    });
  }
  
  // Title animation - spooky text effect
  if (titleRef.current) {
    titleRef.current.style.color = '#ff6600';
    titleRef.current.style.textShadow = '0 0 10px rgba(255, 102, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 1.2, textShadow: '0 0 20px rgba(255, 102, 0, 0.9)' },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.3)" 
      }
    );
    
    // Subtle floating with rotation
    gsap.to(titleRef.current, {
      rotation: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#9c27b0';
    subtitleRef.current.style.textShadow = '0 0 8px rgba(156, 39, 176, 0.6)';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.6 }
    );
    
    // Flickering text
    gsap.to(subtitleRef.current, {
      textShadow: '0 0 15px rgba(156, 39, 176, 0.9)',
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(2)"
    });
  }
  
  // Return cleanup function
  return () => {
    gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current]);
    if (particlesRef.current) {
      gsap.killTweensOf(particlesRef.current.children);
    }
    if (overlayRef && overlayRef.current) {
      gsap.killTweensOf(overlayRef.current);
    }
  };
}