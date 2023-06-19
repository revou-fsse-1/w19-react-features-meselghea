import { useContext, useEffect, ChangeEvent, useState } from "react";
import { AppContext } from "../../Provider";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const context = useContext(AppContext);

  useEffect(() => {
    context?.fetchListPets?.();
}, []);
  
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const text = e.target.value;
  setFilterText(text);
  setCurrentPage(1);
  context?.onFilterChange?.(text);
};

  const handleDelete = async (id: string) => {
    const petToDelete = context?.pets?.find((pet) => pet.id === id);
    if (petToDelete) {
      context?.deletePet?.(petToDelete);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 3;

  const filteredPets = context?.pets || [];
  console.log(filteredPets)
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col items-center justify-center bg-pink-600">
          <button onClick= {handleLogout} className="fixed top-0 right-0 px-4 py-2 text-lg font-semibold text-neutral-300 bg-sky-800 hover:bg-sky-950 rounded-bl-2xl">
            Logout
          </button>
          <h1 className="mt-6 text-xl font-semibold text-center text-white">
            Pets Grooming List
          </h1>
          <h2 className="text-lg font-semibold text-center text-white capitalize ">
            Hi  {sessionStorage.getItem("username")}
          </h2>
          </div>
          <div className="flex items-center justify-center m-4 flex-co">
        <input
          type="text"
          placeholder="Search for Owner Name..."
          className="my-4 w-[300px] p-2 text-center font-semibold text-lg mr-4 bg-white text-slate-700 rounded-xl"
          value={filterText}
          onChange={handleInputChange}
        />
        <button onClick={() => navigate('/add')} className="px-3 py-1 text-white rounded-md bg-sky-800 text-md text-m font-large hover:bg-sky-950">
        <b> + Add Pet</b>
    </button>
</div>
        <table className="bg-white m-7 p-7 rounded-2xl">
          <thead>
            <tr>
              <th className="p-4 text-center bg-blue-100 rounded-tl-2xl">No</th>
              <th className="p-6 text-center bg-blue-100">Pets</th>
              <th className="p-4 text-center bg-blue-100">
                Status
              </th>
              <th className="p-4 text-center bg-blue-100 rounded-tr-2xl">Action</th>
            </tr>
          </thead>

          <tbody onChange={()=> setCurrentPage(1)}>
          {filteredPets.slice(startIndex, endIndex).map((pet, index) => (
              <tr key={pet.id}>
                <td className="p-4 border-y rounded-tr-2xl">{startIndex + index + 1}.</td>
                <td className="p-4 border">
                <b>Owner: {pet.ownerName}</b> <br/> Name: {pet.name} Service: {pet.service}
                </td>
                <td className="items-center p-4 border">
                  {pet.is_completed ? "Completed" : "Ongoing"}
                </td>
                <td className="items-center justify-center border rounded-tr-2xl">
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
          <tfoot>
            <tr>
              <td colSpan={3} className="border-t ">
                <div className="flex justify-between">
                  {currentPage > 1 && (
                    <button
                      onClick={handlePreviousPage}
                      className="px-3 py-2 font-medium text-black rounded-bl-2xl hover:text-stone-400 text-md text-m font-large"
                    >
                      Previous
                    </button>
                  )}
                  {filteredPets.length > endIndex && (
                    <button
                      onClick={handleNextPage}
                      className="py-2 font-medium text-black hover:text-stone-400 px-7 rounded-br-2xl text-md text-m font-large"
                    >
                      Next
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        </div>
    </>
  );
};

export default List

