import React, { useContext } from 'react';

import { AppContext } from './Provider';

export const List = () => {
  const { pet } = useContext(AppContext);
  return (
    <React.Fragment>
      {pet.length > 0 ? (
        <React.Fragment>
          {pet.map((pet) => (
            <div
              className="flex items-center mb-10 bg-gray-100 shadow"
              key={pet.id}
            >
              <div className="flex-auto px-4 py-2 m-2 text-left">
                <p className="leading-none text-gray-900">
                  {pet.name}
                </p>
                <span className="inline-block mt-1 text-sm font-semibold">
                  {pet.ownerName}
                </span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <p className="py-5 text-center text-gray-500 bg-gray-100">No data.</p>
      )}
    </React.Fragment>
  );
}
export default List