import { useContext, useEffect, } from "react";
import { AppContext } from "../../Provider";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  useEffect(() => {
    context?.fetchListPets?.();
  }, []);
  
  const handleDelete = async (id: string) => {
    const petToDelete = context?.pets?.find((pet) => pet.id === id);
    if (petToDelete) {
      context?.deletePet?.(petToDelete);
    }
  };

  
  return (
    <>
      <div className="flex flex-col justify-center mt-6">
        <div className="flex flex-col items-center justify-center bg-pink-600">
          <button onClick={() => navigate('/')} className="fixed top-0 right-0 px-4 py-2 text-white bg-sky-800 hover:bg-sky-950 rounded-bl-2xl">
            Logout
          </button>
          <h1 className="mt-6 text-xl font-semibold text-white">
            Pets Grooming List
          </h1>
        </div>
        <div className="bottom-0 flex items-end justify-center mt-4">
    <button onClick={() => navigate('/add')} className="px-3 py-1 text-white rounded-md bg-sky-800 text-md text-m font-large hover:bg-sky-950">
      <b>+ Add Pet</b>
    </button>
</div>
        <div className="flex flex-col items-center">
        <table className="mt-4 bg-white shadow-lg">
          <thead>
            <tr>
              <th className="px-8 py-4 text-center bg-blue-100 border">No</th>
              <th className="px-8 py-4 text-center bg-blue-100 border">Pets</th>
              <th className="px-8 py-4 text-center bg-blue-100 border">
                Status
              </th>
              <th className="px-8 py-4 text-left bg-blue-100 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {context?.pets?.map((pet) => (
              <tr key={pet.id}>
                <td className="px-8 py-4 border">{pet.id}.</td>
                <td className="px-8 py-4 border">
                <b>Owner: {pet.ownerName}</b> <br/> Name: {pet.name} Service: {pet.service}
                </td>
                <td className="px-8 py-4 border">
                  {pet.is_completed ? "Completed" : "Ongoing"}
                </td>
                <td className="items-center py-4 pl-4">
                  <button onClick={() => navigate(`/edit/${pet.id}`)} className="inline-flex items-center px-2 py-1 mr-1 text-xl text-white bg-blue-600 rounded-md font-large hover:bg-blue-700">
                  ✎
                  </button>
                  <button onClick={() => handleDelete(pet.id)} className="inline-flex items-center px-3 py-1 ml-1 text-xl text-white bg-red-600 rounded-md font-large hover:bg-red-700">
                  x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
      </div>
    </>
  );
};

export default List

