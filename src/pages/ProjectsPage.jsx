import HeroSection from '../components/HeroSection';
import ProjectList from '../components/ProjectList';

function ProjectsPage() {
  return (
    <div className="projects-page">
      <HeroSection 
        title="Our Projects" 
        subtitle="Discover what we've been working on"
      />
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Team Projects</h2>
          <p>Explore the various projects our team has developed together.</p>
          <ProjectList />
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
