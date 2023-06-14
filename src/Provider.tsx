import { createContext, ReactNode, useState } from "react";
import axios from "axios";

type Pet = {
  id: string;
  name: string;
  service: string;
  ownerName: string;
  is_completed: boolean;
};

type AppContextType = {
  onFilterChange: (filterText: string) => void;
  pets: Pet[];
  fetchListPets: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const defaultContext: AppContextType = {
    pets: [],
    fetchListPets: function (): void {
        throw new Error("Function not implemented.");
    },
    onFilterChange: function (): void {
        throw new Error("Function not implemented.");
    }
};

export const AppContext = createContext<AppContextType>(defaultContext);
export const Provider = ({ children }: ProviderProps) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const fetchListPets = async () => {
    const response = await axios.get(
      "https://64263f33d24d7e0de46c68c3.mockapi.io/pets"
    );
    setPets(response.data);
  };
  return (
    <AppContext.Provider value={{ pets, fetchListPets, nFilterChange }}>
      {children}
    </AppContext.Provider>
  );
};
