  // import React, { useState, useEffect } from 'react';
  // import './PhotoGridComponent.css'; // Import CSS file
  // import { startPeriodicPhotoFetch } from '../services/ApiService'; // Import the startPeriodicPhotoFetch function

  // interface PhotoGridComponentProps {
  //   photos: string[];
  // }

  // const PhotoGridComponent: React.FC<PhotoGridComponentProps> = ({ photos: initialPhotos }) => {
  //   const [photos, setPhotos] = useState<string[]>(initialPhotos);
  //   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  //   useEffect(() => {
  //     const fetchIntervalId = startPeriodicPhotoFetch((newPhotos) => {
  //       setCurrentPhotoIndex(0);
  //       setPhotos(newPhotos); 
  //     });

  //     return () => {
  //       clearInterval(fetchIntervalId); 
  //     };
  //   }, []); 

  //   return (
  //     <div className="photo-grid">
  //       <div className="grid-container">
  //         {photos.map((photo, index) => (
  //           <img
  //             key={index}
  //             src={photo}
  //             alt={`Photo ${index}`}
  //             className={index === currentPhotoIndex ? 'active' : ''}
  //             style={{ transition: 'opacity 1s ease-in-out' }}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default PhotoGridComponent;
import React, { useState, useEffect } from 'react';
import './PhotoGridComponent.css';
import { startPeriodicPhotoFetch } from '../services/ApiService';

interface PhotoGridComponentProps {
  photos: string[];
}

const PhotoGridComponent: React.FC<PhotoGridComponentProps> = ({ photos: initialPhotos }) => {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    console.log("Setting up periodic photo fetch...");
    const fetchIntervalId = startPeriodicPhotoFetch((newPhotos) => {
      setCurrentPhotoIndex(0);
      setPhotos(newPhotos); 
    });

    return () => {
      console.log("Clearing fetch interval...");
      clearInterval(fetchIntervalId); 
    };
  }, []); 

  console.log("Rendering PhotoGridComponent with photos:", photos);

  return (
    <div className="photo-grid">
      <div className="grid-container">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index}`}
            className={index === currentPhotoIndex ? 'active' : ''}
            style={{ transition: 'opacity 1s ease-in-out' }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGridComponent;
