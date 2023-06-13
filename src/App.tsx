import { useState, } from 'react';
import Header from './components/HeaderContainer'
import ContainerForm from './components/FormContainer';
import { Photos } from './data/photoDb';
import PhotosContainer from './components/PhotosContainer';
import PhotoFilter from './components/PhotoFilter';

function App() {
  const [filterText, setFilterText] = useState('');
  const [likedCount, setLikedCount] = useState(0);

  const handleFilterChange = (filter: string) => {
    setFilterText(filter);
  };

  const handleLikeChange = (count: number) => {
    setLikedCount(count); 
    console.log(`Liked count changed: ${count}`);
  };

  window.parent.postMessage({ type: 'countChange', count: likedCount }, '*');

  const filteredPhotos = Photos.filter((photo) =>
    photo.name.toLowerCase().includes(filterText.toLowerCase())
  );
  
  return (
    <div className="flex flex-col items-center justify-center bg-pink-600 ">
      <Header />
      <h2 className="mt-4 text-xl font-semibold text-white">List of member photos</h2>
      <PhotoFilter onFilterChange={handleFilterChange} />
      <PhotosContainer photos={filteredPhotos} onLikeChange={handleLikeChange} />
      <ContainerForm />
    </div>
  );
}

export default App;




