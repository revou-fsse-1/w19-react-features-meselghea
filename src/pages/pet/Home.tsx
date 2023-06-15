import { useContext, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Provider";

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  useEffect(() => {
    context?.fetchListPets?.();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => navigate('/register')} className="fixed top-0 right-0 px-4 py-2 text-white bg-sky-950 rounded-bl-2xl">
            Admin
          </button>
          <h1 className="mt-6 text-2xl font-semibold text-white">
            Welcome to Gae-Pets Salon
          </h1>
          <h2 className="text-xl font-semibold text-white ">
            Pets Grooming List
          </h2>
        </div>
        <table className="mt-4 bg-white shadow-lg">
          <thead>
            <tr>
              <th className="px-8 py-4 text-center bg-blue-100 border">No</th>
              <th className="px-8 py-4 text-center bg-blue-100 border">Pets</th>
              <th className="px-8 py-4 text-center bg-blue-100 border">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {context.pets.map((pet) => (
              <tr key={pet.id}>
                <td className="px-8 py-4 border">{pet.id}.</td>
                <td className="px-8 py-4 border">
                  <b>Owner: {pet.ownerName}</b> <br/> Name: {pet.name} Service: {pet.service}
                </td>
                <td className="px-8 py-4 border">
                  {pet.is_completed ? "Completed" : "Ongoing"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
