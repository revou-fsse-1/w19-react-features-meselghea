import { useContext, useEffect } from 'react'
import { AppContext } from './Provider'
import { useNavigate } from 'react-router-dom'

const List = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    context?.fetchListPets?.();
  });
  const isAuthenticated = context?.isAuthenticated;
  
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
     <div className='flex flex-col items-center justify-center bg-pink-600'>
      <a onClick={()=>navigate("/")}>
        <button className="fixed top-0 right-0 px-4 py-2 text-white bg-sky-950 rounded-bl-2xl">Admin</button>
      <h1 className='mt-6 text-xl font-semibold text-white'>Pets Grooming List</h1>
      </a>
    </div>
      <table className='mt-4 bg-white shadow-lg'>
        <thead>
          <tr>
            <th className='px-8 py-4 text-center bg-blue-100 border'>No</th>
            <th className='px-8 py-4 text-center bg-blue-100 border'>Pets</th>
            <th className='px-8 py-4 text-center bg-blue-100 border'>Status</th>
            {isAuthenticated && (
              <>
            <th className='px-8 py-4 text-left bg-blue-100 border'></th>
              <th className='px-8 py-4 text-left bg-blue-100 border'></th>
                </>)}
          </tr>
        </thead>
          <tbody>
        {context?.pets?.map((pet) => (
          <tr key={pet.id}>
            <td className='px-8 py-4 border'>{pet.id}.</td>
            <td className='px-8 py-4 border'> <p className=''>Owner: {pet.ownerName}</p> Name: {pet.name} Service: {pet.service} </td>
            <td className='px-8 py-4 border'>{pet.is_completed ? 'Completed': 'Ongoing'}</td>
            {isAuthenticated && (
                  <>
            <td className='py-4 pl-4'>
                  <button className='inline-flex items-center p-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </button>
                </td>
                <td className='py-4 pr-4'>
                  <button className='inline-flex items-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
                  </>)}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default List