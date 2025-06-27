import React from 'react';

function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Project Image 1",
      description: "Description of project or image 1",
      imageUrl: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      title: "Project Image 2",
      description: "Description of project or image 2",
      imageUrl: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      title: "Project Image 3",
      description: "Description of project or image 3",
      imageUrl: "https://via.placeholder.com/300x200"
    },
    {
      id: 4,
      title: "Project Image 4",
      description: "Description of project or image 4",
      imageUrl: "https://via.placeholder.com/300x200"
    }
  ];

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {galleryItems.map(item => (
          <div key={item.id} className="gallery-item">
            <img src={item.imageUrl} alt={item.title} className="gallery-image" />
            <h3 className="gallery-title">{item.title}</h3>
            <p className="gallery-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
