import { useContext, useEffect, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Provider";

const Home = () => {
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 3;

  const filteredPets = context?.filteredPets || []; 
  return (
    <>
      <header className="fixed top-0 right-0">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-lg font-semibold text-neutral-300 hover:bg-sky-950 rounded-bl-xl bg-sky-800"
        >
          Admin
        </button>
      </header>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-6 text-2xl font-semibold text-center text-white">
            Welcome to Gae-Pets Salon!
          </h1>
          <h2 className="text-xl font-semibold text-white">
            Pets Grooming List
          </h2>
        </div>
        <input
          type="text"
          placeholder="Search for Owner Name..."
          className="my-4 w-[300px] p-2 font-semibold text-lg mr-4 bg-white text-slate-700 rounded-xl"
          value={filterText}
          onChange={handleInputChange}
        />
             <div className="flex flex-col items-center justify-center">
          <table className="m-4 bg-white p-7 rounded-2xl">
            <thead>
              <tr>
                <th className="px-8 py-4 text-center bg-blue-100 rounded-tl-2xl">No</th>
                <th className="px-8 py-4 text-center bg-blue-100">Pets</th>
                <th className="px-8 py-4 text-center bg-blue-100 rounded-tr-2xl">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.slice(startIndex, endIndex).map((pet, index) => (
                <tr key={pet.id}>
                  <td className="px-8 py-4 border-y rounded-tr-2xl">{startIndex + index + 1}.</td>
                  <td className="px-8 py-4 border">
                    <b>Owner: {pet.ownerName}</b> <br /> Name: {pet.name} Service: {pet.service}
                  </td>
                  <td className="px-8 py-4 border-t">
                    {pet.is_completed ? "Completed" : "Ongoing"}
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
        <footer className="absolute inset-x-0 bottom-0 overflow-x-hidden bg-sky-800">
          <div className="md:items-center md:justify-between animate-marquee whitespace-nowrap">
            <span className="inline-block px-1 py-2 ml-1 text-sm font-bold md:px-4 md:ml-5 md:text-2xl text-neutral-300">
              🎉 50% off for the third pet! Limited time offer 🎉
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};


export default Home;
