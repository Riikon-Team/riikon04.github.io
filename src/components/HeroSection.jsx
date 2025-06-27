import './HeroSection.css';

function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage, 
  type = 'image', 
  videoUrl,
  videoOptions = { autoPlay: true, muted: true, loop: true }
}) {
  return (
    <div 
      className={`hero-section ${type === 'video' ? 'video-background' : ''}`}
      style={type === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {type === 'video' && videoUrl && (
        <video
          className="hero-video-background"
          autoPlay={videoOptions.autoPlay}
          muted={videoOptions.muted}
          loop={videoOptions.loop}
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default HeroSection;
