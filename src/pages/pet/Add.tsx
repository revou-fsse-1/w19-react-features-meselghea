import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Provider";

type PetFormData = {
  name: string;
  service: string;
  ownerName: string;
  status?: "Completed" | "Ongoing";
};

const Add: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    service: string().required("Service is required"),
    ownerName: string().required("Owner Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: "Ongoing",
    },
  });

  const onSubmit = (data: PetFormData) => {
    const { name, service, ownerName, status } = data;
    const is_completed = status === "Completed";

    const petData = {
      name,
      service,
      ownerName,
      is_completed,
    };

    context?.savePet?.(petData);

    navigate("/list");
  };

  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
    <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
      <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
      <h1 className="mb-8 text-3xl text-center">Add Pet Form</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input className="block w-full p-3 mb-4 border rounded border-grey-light" placeholder="Name" type="text" id="name" {...register("name")} />
          {errors.name && <p className="text-xs italic text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <input className="block w-full p-3 mb-4 border rounded border-grey-light" placeholder="Service" type="text" id="service" {...register("service")} />
          {errors.service && <p className="text-xs italic text-red-500" >{errors.service.message}</p>}
        </div>
        <div>
          <input className="block w-full p-3 mb-4 border rounded border-grey-light" placeholder="Owner Name" type="text" id="ownerName" {...register("ownerName")} />
          {errors.ownerName && <p className="text-xs italic text-red-500" >{errors.ownerName.message}</p>}
        </div>
        <div>
          <select className="block w-full p-3 mb-4 text-center border rounded border-grey-light" id="status" {...register("status")}>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
        <button className='w-full py-3 my-1 text-center text-white rounded bg-sky-600 hover:bg-sky-700 focus:outline-none' type="submit">Add Pet</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Add