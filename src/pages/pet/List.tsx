import { useContext } from 'react';

import { AppContext } from './Provider';

export const List = () => {
  const { pets } = useContext(AppContext);
  return (
    <>
      {pets.length > 0 ? (
        <>
          {pets.map((pet) => (
            <div
              className="flex items-center mb-10"
              key={pet.id}
            >
              <div className="flex-auto px-4 py-2 m-2 text-left">
                <p className="leading-none text-gray-900">
                  {pet.name}
                </p>
                <p className="leading-none text-gray-900">
                  {pet.service}
                </p>
                <span className="inline-block mt-1 text-sm font-semibold">
                  {pet.ownerName}
                </span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="py-5 text-center text-gray-500">No data.</p>
      )}
    </>
  );
}
export default List