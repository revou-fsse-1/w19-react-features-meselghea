import React, { useEffect, useState } from 'react';
import { Photo } from '../data/photoDb';
import PhotoCard from './photolist/PhotoCard';

interface PhotosContainerProps {
  photos: Photo[]; 
  onLikeChange: (count: number) => void; 
}

const PhotosContainer: React.FC<PhotosContainerProps> = ({ photos, onLikeChange }) => {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const storedLikes = sessionStorage.getItem('likes');
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLikes(parsedLikes);
    }
  }, []);

  const handleLike = (photoId: number) => {
    const updatedLikes = { ...likes };
    updatedLikes[photoId] = !updatedLikes[photoId];
    sessionStorage.setItem('likes', JSON.stringify(updatedLikes));
    setLikes(updatedLikes);
    const likedCount = Object.values(updatedLikes).filter((liked) => liked === true).length;
    onLikeChange(likedCount);
  };

  return (
    <div className="mt-7 max-w-[900px] flex flex-wrap flex-row justify-center items-center gap-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} liked={likes[photo.id]} onLike={() => handleLike(photo.id)} />
      ))}
    </div>
  );
};

export default PhotosContainer;