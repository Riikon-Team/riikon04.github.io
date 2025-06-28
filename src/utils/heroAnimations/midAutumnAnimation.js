import gsap from 'gsap';

export default function initMidAutumnAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create mid-autumn elements (moon, lanterns, stars)
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create full moon
    const moon = document.createElement('div');
    moon.className = 'mid-autumn-moon';
    moon.style.width = '100px';
    moon.style.height = '100px';
    moon.style.borderRadius = '50%';
    moon.style.background = 'radial-gradient(circle, #FFF6D9 30%, #FFC266 100%)';
    moon.style.boxShadow = '0 0 30px rgba(255, 246, 217, 0.8)';
    moon.style.position = 'absolute';
    moon.style.top = '15%';
    moon.style.right = '15%';
    particlesRef.current.appendChild(moon);
    
    // Create lanterns and stars
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      
      if (i < 15) {
        // Lanterns
        particle.className = 'mid-autumn-lantern';
        
        if (Math.random() > 0.5) {
          particle.innerHTML = '🏮';
          particle.style.fontSize = `${Math.random() * 24 + 16}px`;
        } else {
          particle.innerHTML = '🥮'; // Mooncake
          particle.style.fontSize = `${Math.random() * 18 + 12}px`;
        }
        
        particle.style.position = 'absolute';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 70 + 20}%`;
      } else {
        // Stars
        particle.className = 'mid-autumn-star';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = '#ffffff';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 8px #ffffff';
        particle.style.position = 'absolute';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 50}%`;
        particle.style.opacity = Math.random() * 0.7 + 0.3;
      }
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate moon
    gsap.to(moon, {
      y: 10,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Moon glow
    gsap.to(moon, {
      boxShadow: '0 0 50px rgba(255, 246, 217, 0.9)',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Animate lanterns
    const lanterns = [...particlesRef.current.children].filter(el => el.className === 'mid-autumn-lantern');
    lanterns.forEach(lantern => {
      gsap.to(lantern, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
    
    // Animate stars (twinkling)
    const stars = [...particlesRef.current.children].filter(el => el.className === 'mid-autumn-star');
    stars.forEach(star => {
      gsap.to(star, {
        opacity: gsap.utils.random(0.1, 0.9),
        duration: gsap.utils.random(0.5, 2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#FF9800';
    titleRef.current.style.textShadow = '0 0 10px rgba(255, 152, 0, 0.7)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );
    
    // Gentle floating
    gsap.to(titleRef.current, {
      y: 6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#E65100';
    subtitleRef.current.style.textShadow = '0 0 8px rgba(230, 81, 0, 0.5)';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)", delay: 0.4 }
    );
  }
  
  // Background effect
  if (heroRef.current) {
    gsap.fromTo(
      heroRef.current,
      { backgroundPosition: '0% 0%' },
      { 
        backgroundPosition: '100% 10%', 
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }
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