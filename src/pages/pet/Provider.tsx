import { createContext, ReactNode, useState } from 'react';
import axios from 'axios';

type Pet = {
id: number;
name: string;
service: string;
ownerName: string;
is_completed: boolean
}


type AppContextType = {
pets: Pet[]
fetchListPets: () => void
}

type ProviderProps = {
children: ReactNode;
}

const defaultContext: AppContextType = {
    pets: [],
    fetchListPets: function (): void {
        throw new Error('Function not implemented.');
    }
}

    export const AppContext = createContext<AppContextType>(defaultContext);
export const Provider = ({ children } : ProviderProps ) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const fetchListPets = async () => {
        try {
        const response = await axios.get('http://localhost:3006/pets');
        setPets(response.data);
        } catch (error) {
        console.error('Error fetching pets:', error);
        }
        };
return (
<AppContext.Provider value={{pets, fetchListPets}}>
    {children}
    </AppContext.Provider>
    )
};