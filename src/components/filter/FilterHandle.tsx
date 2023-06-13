import { useState } from 'react';
import { Photo } from '../../data/photoDb';

export const filterByName = (photos: Photo[], filterText: string): Photo[] => {
  return photos.filter((photo) =>
    photo.name.toLowerCase().includes(filterText.toLowerCase())
  );
};

export const useFilterHandler = (photos: Photo[]) => {
  const [filteredPhotos, setFilteredPhotos] = useState(photos);

  const handleFilter = (filterText: string) => {
    const filtered = filterByName(photos, filterText);
    setFilteredPhotos(filtered);
  };

  return { filteredPhotos, handleFilter };
};