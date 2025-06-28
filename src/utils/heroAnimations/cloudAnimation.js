import gsap from 'gsap';

export default function initCloudAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create drifting clouds
  const cloudCount = 10;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create cloud particles
    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud-particle';
      
      // Random positions
      cloud.style.left = `${Math.random() * 100}%`;
      cloud.style.top = `${Math.random() * 60}%`;
      
      // Random size and opacity
      const size = Math.random() * 150 + 50;
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size * 0.6}px`;
      cloud.style.opacity = Math.random() * 0.5 + 0.2;
      
      particlesRef.current.appendChild(cloud);
    }
    
    // Animate clouds
    const clouds = particlesRef.current.children;
    [...clouds].forEach(cloud => {
      const speed = Math.random() * 100 + 50;
      
      gsap.to(cloud, {
        x: window.innerWidth,
        duration: speed,
        repeat: -1,
        ease: "none",
        onRepeat: function() {
          gsap.set(cloud, { 
            x: -parseFloat(cloud.style.width),
            y: `${Math.random() * 10 - 5}%`, 
          });
        }
      });
      
      // Subtle floating up and down
      gsap.to(cloud, {
        y: '+=20',
        duration: Math.random() * 5 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
    
    // Gentle floating
    gsap.to(titleRef.current, {
      y: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power1.inOut", delay: 0.8 }
    );
    
    // Slight floating in opposite direction to title
    gsap.to(subtitleRef.current, {
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
  }
  
  // Gentle background color transition
  if (heroRef.current) {
    gsap.to(heroRef.current, {
      backgroundColor: 'rgba(135, 206, 250, 0.2)',
      duration: 10,
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