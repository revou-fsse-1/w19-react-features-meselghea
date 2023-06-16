import { useContext, useEffect, ChangeEvent } from "react";
import { AppContext } from "../../Provider";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  useEffect(() => {
    context?.fetchListPets?.();
    const token = sessionStorage.getItem('token');

  if (token) {
    const expirationDate = parseInt(token.split('_')[4]);
    if (expirationDate < new Date().getHours()) {
      sessionStorage.removeItem('token');
      window.location.href = '/';
    }
  }
}, []);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    context?.onFilterChange?.(filterText);
  };

  const handleDelete = async (id: string) => {
    const petToDelete = context?.pets?.find((pet) => pet.id === id);
    if (petToDelete) {
      context?.deletePet?.(petToDelete);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col items-center justify-center bg-pink-600">
          <button onClick= {handleLogout} className="fixed top-0 right-0 px-4 py-2 text-white bg-sky-800 hover:bg-sky-950 rounded-bl-2xl">
            Logout
          </button>
          <h1 className="mt-6 text-xl font-semibold text-center text-white">
            Pets Grooming List
          </h1>
        </div>
        <div className="bottom-0 flex items-end justify-center mt-4">
    <div className="">
      <input
        type="text"
        placeholder="Search for Owner Name..."
        className="my-4 w-[300px] p-2 font-semibold text-lg mr-4 bg-white text-slate-700 rounded-xl"
        onChange={handleInputChange}
      />
    <button onClick={() => navigate('/add')} className="px-3 py-1 text-white rounded-md bg-sky-800 text-md text-m font-large hover:bg-sky-950">
      <b>+ Add Pet</b>
    </button>
    </div>
</div>
        <div className="flex flex-col items-center">
        <table className="m-4 bg-white shadow-lg p-7">
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
            {context?.filteredPets?.map((pet) => (
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

