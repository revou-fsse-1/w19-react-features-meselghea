import { createContext, ReactNode } from 'react';

type Pet = {
id: number;
name: string;
ownerName: string;
};

type AppContextType = {
pet: Pet[];
};

const defaultContext: AppContextType = {
pet: [
{
id: 1,
name: 'Shiro',
ownerName: 'Mike',
},
],
};

type ProviderProps = {
children: ReactNode;
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const Provider = ({ children } : ProviderProps ) => {
return (
<AppContext.Provider value={defaultContext}>
    {children}
    </AppContext.Provider>
    )
};