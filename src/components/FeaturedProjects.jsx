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

  // Select up to 6 projects to feature
  const featuredProjects = projects.slice(0, 6);

  if (featuredProjects.length === 0) {
    return <div className="featured-projects empty">No featured projects available.</div>;
  }

  return (
    <div className="featured-projects">
      <div className="project-list">
        {featuredProjects.map(project => (
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
              {project.languages && project.languages.map((lang, index) => {
                const getLanguageIcon = (language) => {
                  const langLower = language.toLowerCase();
                  switch (langLower) {
                    case 'javascript':
                    case 'js':
                      return { icon: 'bi-filetype-js', color: 'var(--lang-js, #f7df1e)' };
                    case 'typescript':
                    case 'ts':
                      return { icon: 'bi-filetype-tsx', color: 'var(--lang-ts, #3178c6)' };
                    case 'react':
                      return { icon: 'bi-filetype-jsx', color: 'var(--lang-react, #61dafb)' };
                    case 'python':
                      return { icon: 'bi-filetype-py', color: 'var(--lang-python, #3776ab)' };
                    case 'java':
                      return { icon: 'bi-cup-hot', color: 'var(--lang-java, #ed8b00)' };
                    case 'html':
                      return { icon: 'bi-filetype-html', color: 'var(--lang-html, #e34f26)' };
                    case 'css':
                      return { icon: 'bi-filetype-css', color: 'var(--lang-css, #1572b6)' };
                    case 'node.js':
                    case 'nodejs':
                      return { icon: 'bi-braces', color: 'var(--lang-node, #339933)' };
                    case 'php':
                      return { icon: 'bi-filetype-php', color: 'var(--lang-php, #777bb4)' };
                    case 'c++':
                      return { icon: 'bi-file-code', color: 'var(--lang-cpp, #00599c)' };
                    case 'c#':
                      return { icon: 'bi-file-code', color: 'var(--lang-csharp, #239120)' };
                    default:
                      return { icon: 'bi-code-slash', color: 'var(--text-color-secondary)' };
                  }
                };
                
                const { icon, color } = getLanguageIcon(lang);
                
                return (
                  <span className="tag" key={index} style={{ borderColor: color }}>
                    <i className={`bi ${icon}`} style={{ color }}></i> {lang}
                  </span>
                );
              })}
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
    </div>
  );
}

export default FeaturedProjects;
