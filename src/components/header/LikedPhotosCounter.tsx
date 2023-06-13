import React, { useState } from 'react';

interface LikesPhotoCounterProps {
  count: number;
}

const LikesPhotoCounter: React.FC<LikesPhotoCounterProps> = ({ count }) => {
  const [likedCount, setLikedCount] = useState(count);

  const updateLikedCount = (newCount: number) => {
    setLikedCount(newCount);
    console.log(`Liked count changed: ${newCount}`); // Menampilkan count di console
  };

  let responsed = "";

  if (likedCount === 0) {
    responsed = "You have no liked photos yet :(";
  } else {
    responsed = `My Liked Photos (${likedCount})`;
  }

  if (count !== likedCount) {
    updateLikedCount(count);
  }


  return (
    <div className="fixed top-0 right-0 px-4 py-2 text-white bg-sky-950 rounded-bl-2xl">
      <span className="text-white text-md">{responsed}</span>
    </div>
  );
};

export default LikesPhotoCounter;