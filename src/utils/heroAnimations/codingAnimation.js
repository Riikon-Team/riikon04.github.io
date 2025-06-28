import gsap from 'gsap';

export default function initCodingAnimation({ heroRef, titleRef, subtitleRef, particlesRef }) {
  // Create matrix-style falling code
  const particleCount = 500;
  const codeChars = '01{}()<>/\\|;:[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  // Clear previous particles
  if (particlesRef.current) {
    particlesRef.current.innerHTML = '';
    
    // Create code particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'code-particle';
      
      // Random positions
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.fontSize = `${Math.random() * 14 + 8}px`;
      particle.style.opacity = Math.random() * 0.7 + 0.3;
      
      // Random character
      particle.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
      
      particlesRef.current.appendChild(particle);
    }
    
    // Animate particles
    const particles = particlesRef.current.children;
    [...particles].forEach(particle => {
      gsap.to(particle, {
        y: '120vh',
        duration: gsap.utils.random(5, 15),
        repeat: -1,
        ease: "none",
        delay: gsap.utils.random(0, 5),
        onRepeat: function() {
          gsap.set(particle, { 
            y: -30, 
            x: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3
          });
          particle.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
        }
      });
    });
  }
  
  // Title animation - computer typing effect
  if (titleRef.current) {
    const titleText = titleRef.current.textContent;
    titleRef.current.textContent = '';
    
    gsap.to(titleRef.current, {
      duration: titleText.length * 0.06,
      text: {
        value: titleText,
        delimiter: ""
      },
      ease: "none",
      repeat: 0
    });
    
    // Blinking cursor effect
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    titleRef.current.appendChild(cursor);
    
    gsap.to(cursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6
    });
  }
  
  // Subtitle animation - command line effect
  if (subtitleRef.current) {
    const subtitleText = subtitleRef.current.textContent;
    subtitleRef.current.textContent = '> ';
    
    gsap.to(subtitleRef.current, {
      duration: subtitleText.length * 0.03,
      text: {
        value: '> ' + subtitleText,
        delimiter: ""
      },
      ease: "none",
      delay: 1.5
    });
  }
  
  // Terminal overlay effect
  if (heroRef.current) {
    gsap.fromTo(
      heroRef.current,
      { backgroundImage: 'linear-gradient(rgba(0, 30, 30, 0.9), rgba(0, 10, 10, 0.9))' },
      { 
        backgroundImage: 'linear-gradient(rgba(0, 20, 20, 0.9), rgba(0, 5, 5, 0.9))',
        duration: 2,
        repeat: -1,
        yoyo: true
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