import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Provider";

type PetFormData = {
  name: string;
  service: string;
  ownerName: string;
  status: boolean;
};

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(AppContext);
  const pet = context?.pets?.find((pet) => pet.id === id);

  const [formData, setFormData] = useState<PetFormData>({
    name: pet?.name || "",
    service: pet?.service || "",
    ownerName: pet?.ownerName || "",
    status: pet?.is_completed || false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "status") {
      const isCompleted = value === "true";
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isCompleted,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = () => {
    const { name, service, ownerName, status } = formData;
    const isCompleted = status === true;

    const petData = {
      id,
      name,
      service,
      ownerName,
      is_completed: isCompleted,
    };

    context?.updatePet?.(petData);

    navigate("/list");
  };

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center">Edit Pet Form</h1>
          <form className="flex flex-col gap-2">
            <div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                placeholder="Service"
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                placeholder="Owner Name"
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                className="block w-full p-3 mb-4 text-center border rounded border-grey-light"
                name="status"
                value={formData.status ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="true">Completed</option>
                <option value="false">Ongoing</option>
              </select>
            </div>
            <button
              className="w-full py-3 my-1 text-center text-white rounded bg-sky-600 hover:bg-sky-700 focus:outline-none"
              type="button"
              onClick={handleUpdate}
            >
              Update Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit
