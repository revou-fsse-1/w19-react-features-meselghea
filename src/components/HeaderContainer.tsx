import { useEffect, useState } from 'react';
import LikesPhotoCounter from './header/LikedPhotosCounter';

function Header() {
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === 'countChange') {
      const count = event.data.count;
      setLikedCount(count);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-pink-600 ">
      <h1 className="mt-4 text-3xl font-bold text-white">Photo Club Gallery</h1>
      <LikesPhotoCounter count={likedCount} />
    </div>
  );
}

export default Header;