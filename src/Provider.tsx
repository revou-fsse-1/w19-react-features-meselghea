import { createContext, ReactNode, useState } from "react";
import axios from "axios";

type Pet = {
  id: string;
  name: string;
  service: string;
  ownerName: string;
  is_completed: boolean;
};

type ReqPet = {
  id?: string;
  name: string;
  service: string;
  ownerName: string;
  is_completed?: boolean;
}

type AppContextType = {
  pets: Pet[]
  fetchListPets: () => void
  savePet: (data: ReqPet) => void
  updatePet: (data: ReqPet) => void
  deletePet: (pet: Pet) => void
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
  updatePet: () => {
    throw new Error("Function not implemented.");
},
  deletePet: () => {
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

const savePet = async (data: ReqPet) => {
  const response = await axios.post(
    "https://64263f33d24d7e0de46c68c3.mockapi.io/pets",
    { name: data.name , service: data.service, ownerName: data.ownerName }
  );
  setPets([...pets, response.data]);
}

const updatePet = async (data: ReqPet) => {
  if (data.id) {
    try {
      await axios.put(
        `https://64263f33d24d7e0de46c68c3.mockapi.io/pets/${data.id}`,
        {
          name: data.name,
          service: data.service,
          ownerName: data.ownerName,
          is_completed: data.is_completed,
        }
      );
      fetchListPets();
    } catch (error) {
      console.error("Failed to update pet:", error);
    }
  }
};


const deletePet = async (pet: Pet) => {
  try {
    await axios.delete(
      `https://64263f33d24d7e0de46c68c3.mockapi.io/pets/${pet.id}`
    );
    setPets((prevPets) => prevPets.filter((p) => p.id !== pet.id));
  } catch (error) {
    console.error("Failed to delete pet:", error);
  }
};


  return (
    <AppContext.Provider
      value={{ pets, fetchListPets,savePet, deletePet, updatePet }}
    >
      {children}
    </AppContext.Provider>
  );
};