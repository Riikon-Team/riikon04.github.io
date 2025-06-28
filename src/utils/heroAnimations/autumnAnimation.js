import gsap from 'gsap';

export default function initAutumnAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create falling autumn leaves
  const particleCount = 60;
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create leaf particles
    for (let i = 0; i < particleCount; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'autumn-leaf';
      
      // Random positions
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.top = `-${Math.random() * 10 + 5}%`;
      
      // Random size
      const size = Math.random() * 20 + 10;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      
      // Choose random leaf emoji or shape
      if (Math.random() > 0.6) {
        leaf.innerHTML = '🍂';
        leaf.style.fontSize = `${size + 5}px`;
      } else if (Math.random() > 0.3) {
        leaf.innerHTML = '🍁';
        leaf.style.fontSize = `${size + 5}px`;
      } else {
        // Leaf shape
        leaf.style.backgroundColor = `rgba(${Math.floor(Math.random() * 50 + 150)}, 
                                          ${Math.floor(Math.random() * 70 + 60)}, 
                                          ${Math.floor(Math.random() * 30)}, 
                                          ${Math.random() * 0.4 + 0.6})`;
        leaf.style.borderRadius = '30% 70% 30% 70%';
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
      
      particlesRef.current.appendChild(leaf);
    }
    
    // Animate leaves
    const leaves = particlesRef.current.children;
    [...leaves].forEach(leaf => {
      // Random horizontal drift
      const xDrift = Math.random() * 200 - 100; // -100 to +100
      
      gsap.to(leaf, {
        y: '110vh',
        x: `+=${xDrift}`,
        rotation: Math.random() * 720 - 360,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        ease: "power1.in",
        delay: Math.random() * 5,
        onRepeat: function() {
          gsap.set(leaf, { 
            y: '-5vh', 
            x: `${Math.random() * 100}%`,
          });
        }
      });
    });
  }
  
  // Title animation
  if (titleRef.current) {
    titleRef.current.style.color = '#e65100';
    titleRef.current.style.textShadow = '0 0 10px rgba(230, 81, 0, 0.5)';
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
    );
    
    // Gentle swaying animation like a tree in autumn wind
    gsap.to(titleRef.current, {
      x: 5,
      rotation: 1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  
  // Subtitle animation
  if (subtitleRef.current) {
    subtitleRef.current.style.color = '#bf360c';
    subtitleRef.current.style.textShadow = '0 0 8px rgba(191, 54, 12, 0.5)';
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
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