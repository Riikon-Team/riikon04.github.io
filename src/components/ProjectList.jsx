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

  const topProjects = projects.slice(0, 7);

  return (
    <div className="project-list">
      {topProjects.map(project => (
        <div className="project-card" key={project._id || project.id}>
          <div className="project-header">
            <h3 className="project-title">{project.name}</h3>
            <div className="project-date">
              <i className="bi bi-calendar-check"></i>
              <span>{new Date(project.deployedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <p className="project-description">{project.description}</p>
          
          <div className="project-tags">
            {project.languages && project.languages.map((lang, index) => (
              <span className="tag" key={index}>
                <i className="bi bi-code-slash"></i> {lang}
              </span>
            ))}
          </div>
          
          <div className="project-footer">
            {project.githubUrl && (
              <a href={project.githubUrl} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i> View on GitHub
              </a>
            )}
            
            {project.websiteUrl && (
              <a href={project.websiteUrl} className="project-link website-link" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-globe"></i> Visit Website
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
