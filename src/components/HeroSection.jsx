import './HeroSection.css';

function HeroSection({ title, subtitle, backgroundImage }) {
  return (
    <div 
      className="hero-section"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default HeroSection;
