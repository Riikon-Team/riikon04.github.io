import HeroSection from '../components/HeroSection';
import DiscordInfo from '../components/DiscordInfo';
import TeamMembers from '../components/TeamMembers';
import Gallery from '../components/Gallery';
import FeaturedProjects from '../components/FeaturedProjects';
import ContactSection from '../components/ContactSection';

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection 
        title="Welcome to Our Team" 
        subtitle="We create amazing projects together"
      />
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Discord Community</h2>
          <DiscordInfo />
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <TeamMembers />
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <Gallery />
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <FeaturedProjects />
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <ContactSection />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
