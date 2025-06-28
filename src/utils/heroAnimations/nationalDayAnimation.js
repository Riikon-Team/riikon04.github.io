import gsap from 'gsap';

export default function initNationalDayAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create patriotic elements (flags, fireworks)
  const particleCount = 50;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create flags and fireworks
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      
      if (Math.random() > 0.7) {
        // Flag - use Vietnam flag image instead of emoji
        particle.className = 'national-flag';
        const flagImg = document.createElement('img');
        flagImg.src = "https://thuvienvector.vn/wp-content/uploads/2025/02/co-viet-nam-png.jpg";
        flagImg.alt = "Vietnam Flag";
        
        // Set size for the flag container
        const flagSize = Math.random() * 50 + 30;
        particle.style.width = `${flagSize}px`;
        particle.style.height = `${flagSize * 0.67}px`; // Maintain aspect ratio
        
        particle.style.top = `${Math.random() * 80 + 10}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        particle.appendChild(flagImg);
      } else {
        // Firework spark
        particle.className = 'national-firework';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 40 + 10}%`;
        
        // Red or yellow for national colors
        if (Math.random() > 0.5) {
          particle.style.backgroundColor = '#ff0000';
          particle.style.boxShadow = '0 0 10px #ff0000';
        } else {
          particle.style.backgroundColor = '#ffff00';
          particle.style.boxShadow = '0 0 10px #ffff00';
        }
      }
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate flags
    const flags = [...particlesRef.current.children].filter(el => el.className === 'national-flag');
    flags.forEach(flag => {
      gsap.to(flag, {
        rotation: gsap.utils.random(-5, 5),
        y: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random()
      });
    });
    
    // Animate fireworks
    const fireworks = [...particlesRef.current.children].filter(el => el.className === 'national-firework');
    fireworks.forEach(firework => {
      const duration = Math.random() * 1.5 + 1;
      
      gsap.to(firework, {
        scale: Math.random() * 3 + 1,
        opacity: 0,
        duration: duration,
        repeat: -1,
        repeatDelay: Math.random() * 4 + 1,
        ease: "power1.out",
        onRepeat: function() {
          const x = Math.random() * 100;
          const y = Math.random() * 40 + 10;
          gsap.set(firework, {
            x: `${x}%`,
            y: `${y}%`,
            scale: 0.3,
            opacity: 1
          });
        }
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#ff0000';
    titleRef.current.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30, scale: 1.2 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
    );
    
    // Pulsating effect
    gsap.to(titleRef.current, {
      textShadow: '0 0 20px rgba(255, 0, 0, 0.9)',
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#ffff00';
    subtitleRef.current.style.textShadow = '0 0 8px rgba(255, 255, 0, 0.7)';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
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