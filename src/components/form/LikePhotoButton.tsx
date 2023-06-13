import React from 'react';

interface LikePhotoButtonProps {
  liked: boolean;
  onClick: () => void;
}

const LikePhotoButton: React.FC<LikePhotoButtonProps> = ({ liked, onClick }) => {
  const buttonText = liked ? 'Liked' : 'Like';

  return (
    <button className="like-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default LikePhotoButton;