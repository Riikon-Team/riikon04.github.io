import React, { useEffect } from 'react';
import { useRiikonData } from '../contexts/RiikonDataContext';
import './ProjectList.css'; // Reuse existing CSS for consistency

function FeaturedProjects() {
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
    return <div className="featured-projects loading">Loading featured projects...</div>;
  }

  if (projectsError) {
    return <div className="featured-projects error">Failed to load projects.</div>;
  }

  // Select up to 2 projects to feature
  const featuredProjects = projects.slice(0, 2);

  if (featuredProjects.length === 0) {
    return <div className="featured-projects empty">No featured projects available.</div>;
  }

  return (
    <div className="featured-projects">
      <div className="project-list">
        {featuredProjects.map(project => (
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
                {project.languages && project.languages.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
              {project.websiteUrl && (
                <a href={project.websiteUrl} className="btn project-link" target="_blank" rel="noopener noreferrer">
                  View Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProjects;
