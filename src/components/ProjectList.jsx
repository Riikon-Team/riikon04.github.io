import { useEffect } from 'react';
import { useRiikonData } from '../contexts/RiikonDataContext';
import './ProjectList.css';

function ProjectList() {
  const { 
    projects, 
    projectsLoading, 
    projectsError, 
    fetchProjects 
  } = useRiikonData();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (projectsLoading) {
    return <div className="project-list loading">Loading projects...</div>;
  }

  if (projectsError) {
    return <div className="project-list error">Failed to load projects: {projectsError}</div>;
  }

  if (projects.length === 0) {
    return <div className="project-list empty">No projects found.</div>;
  }

  return (
    <div className="project-list">
      {projects.map(project => (
        <div className="project-card" key={project.id}>
          <div className="project-image">
            <img 
              src={project.imageUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(project.name)}`} 
              alt={project.name} 
            />
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.languages && project.languages.map((lang, index) => (
                <span className="tag" key={index}>{lang}</span>
              ))}
            </div>
            {project.websiteUrl && (
              <a href={project.websiteUrl} className="btn project-link" target="_blank" rel="noopener noreferrer">
                View Website
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className="btn project-link github-link" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
