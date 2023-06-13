import React, { ChangeEvent } from 'react';

interface PhotoFilterProps {
  onFilterChange: (filterText: string) => void;
}

const PhotoFilter: React.FC<PhotoFilterProps> = ({ onFilterChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    onFilterChange(filterText);
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search for photos..."
        className="my-4 w-[300px] p-2 font-semibold text-lg bg-white text-slate-700 rounded-xl"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PhotoFilter;
