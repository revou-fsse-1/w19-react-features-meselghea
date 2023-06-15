import { createContext, ReactNode, useState } from "react";
import axios from "axios";

type Pet = {
  id: string;
  name: string;
  service: string;
  ownerName: string;
  is_completed: boolean;
};

type NewPet = {
  id?: string;
  name: string;
  service: string;
  ownerName: string;
  is_completed?: boolean;
}

type AppContextType = {
  pets: Pet[]
  fetchListPets: () => void
  savePet: (data: NewPet) => void
  handleDelete: (pet: Pet) => void
};

type ProviderProps = {
  children: ReactNode;
};

const defaultContext: AppContextType = {
  pets: [],
  fetchListPets: () => {
    throw new Error("Function not implemented.");
  },
    savePet: () => {
      throw new Error("Function not implemented.");
  },
  handleDelete: () => {
    throw new Error("Function not implemented.");
},
};

export const AppContext = createContext<AppContextType>(defaultContext);
export const Provider = ({ children }: ProviderProps) => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchListPets = async () => {
                                /* try { */
    const response = await axios.get(
      "https://64263f33d24d7e0de46c68c3.mockapi.io/pets"
    )
    setPets(response.data)
                            /* } catch (error) {
    console.error("Error fetching pets:", error);
  }                            */
}

const savePet = async (data: NewPet) => {
  const response = await axios.post(
    "https://64263f33d24d7e0de46c68c3.mockapi.io/pets",
    { name: data.name , service: data.service, ownerName: data.ownerName }
  );
  setPets([...pets, response.data]);
}

const handleDelete = async (pet: Pet) => {
  await axios.delete(`https://64263f33d24d7e0de46c68c3.mockapi.io/pets/${pet.id}`);
  setPets(pets.filter((data) => data.id !== pet.id));
};
  return (
    <AppContext.Provider
      value={{ pets, fetchListPets,savePet, handleDelete }}
    >
      {children}
    </AppContext.Provider>
  );
};