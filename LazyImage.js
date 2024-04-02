import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    let observer;
    let didCancel = false;

    const loadImage = () => {
      const image = new Image();
      image.src = src;
      image.onload = () => !didCancel && setImageSrc(src);
    };

    if (IntersectionObserver) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
              loadImage();
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '75%',
        }
      );
      observer.observe(document.getElementById('image-container'));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      loadImage();
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(document.getElementById('image-container'));
      }
    };
  }, [src]);

  return <img id="image-container" src={imageSrc ? imageSrc : null} alt={alt} />;
};

export default LazyImage;