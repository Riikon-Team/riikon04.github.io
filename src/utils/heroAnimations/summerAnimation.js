import gsap from 'gsap';

export default function initSummerAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create summer elements (sun rays, beach items)
  const particleCount = 40;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create a sun
    const sun = document.createElement('div');
    sun.className = 'summer-sun';
    sun.style.width = '120px';
    sun.style.height = '120px';
    sun.style.borderRadius = '50%';
    sun.style.background = 'radial-gradient(circle, #FFD700 30%, #FF8C00 100%)';
    sun.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.8)';
    sun.style.position = 'absolute';
    sun.style.top = '10%';
    sun.style.right = '10%';
    particlesRef.current.appendChild(sun);
    
    // Create sun rays
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement('div');
      ray.className = 'sun-ray';
      ray.style.width = '4px';
      ray.style.height = '50px';
      ray.style.background = 'linear-gradient(to top, rgba(255, 215, 0, 0.7), rgba(255, 215, 0, 0))';
      ray.style.position = 'absolute';
      ray.style.top = '50%';
      ray.style.left = '50%';
      ray.style.transformOrigin = 'bottom center';
      ray.style.transform = `rotate(${i * 30}deg) translateY(-90px)`;
      sun.appendChild(ray);
    }
    
    // Summer items
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'summer-particle';
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 80 + 20}%`;
      
      // Random summer emoji
      const summerEmojis = ['🏄', '🏊', '🌴', '🍹', '🍦', '⛱️', '🌞', '🛶', '🐚', '🐠'];
      const emoji = summerEmojis[Math.floor(Math.random() * summerEmojis.length)];
      particle.innerHTML = emoji;
      particle.style.fontSize = `${Math.random() * 20 + 15}px`;
      particle.style.opacity = Math.random() * 0.5 + 0.5;
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate sun
    gsap.to(sun, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none"
    });
    
    // Pulsate sun
    gsap.to(sun, {
      boxShadow: '0 0 70px rgba(255, 215, 0, 0.9)',
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Animate summer items
    const particles = [...particlesRef.current.children].filter(el => el.className === 'summer-particle');
    particles.forEach(particle => {
      gsap.to(particle, {
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-20, 20),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#0091ea';
    titleRef.current.style.textShadow = '0 0 10px rgba(0, 145, 234, 0.5)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" }
    );
    
    // Gentle wave animation
    gsap.to(titleRef.current, {
      y: 8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#00b8d4';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power1.out", delay: 0.4 }
    );
  }
  
  // Return cleanup function
  return () => {
    gsap.killTweensOf([heroRef.current, titleRef.current, subtitleRef.current]);
    if (particlesRef.current) {
      gsap.killTweensOf(particlesRef.current.children);
      const sunRays = particlesRef.current.querySelector('.summer-sun')?.children;
      if (sunRays) gsap.killTweensOf(sunRays);
    }
  };
}