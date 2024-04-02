import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage';

const Gallery = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?count=3&client_id=ec8PI2BUraT8xDAwtPclslY7Avo_JTpLdMTI2KxXnx0');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="gallery">
      {Array.isArray(images) && images.map(image => (
        <LazyImage key={image.id} src={image.urls.regular} alt={image.alt_description} />
      ))}
    </div>
  );
};

export default Gallery;