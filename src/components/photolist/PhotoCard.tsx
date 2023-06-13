import React from 'react';

interface PhotoCardProps {
  photo: {
    id: number;
    url: string;
    name: string;
    liked: boolean;
  };
  liked: boolean;
  onLike: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, liked, onLike }) => {
  const { url, name } = photo;

  const handleLikeClick = () => {
    onLike();
  };

  return (
    <div className="relative duration-500 bg-white rounded-lg hover:scale-110">
      <img
        className="w-[200px] h-[270px] rounded-lg"
        src={url}
      ></img>
      <div className="absolute top-2 right-2">
        <button
          className={`px-2 py-1 text-xs font-semibold ${
            liked ? 'bg-sky-600' : 'bg-sky-950'
          } text-white rounded`}
          onClick={handleLikeClick}
        >
          {liked ? 'Liked' : 'Like'}
        </button>
      </div>
      <h3 className="text-white font-semibold text-lg text-center mt-[-30px]">{name}</h3>
    </div>
  );
};

export default PhotoCard;