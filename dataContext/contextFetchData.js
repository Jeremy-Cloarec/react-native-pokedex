import React, { createContext, useContext, useState } from 'react';

import { useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPokemonsFromPokebuild = async () => {
        try {
            const response = await fetch(
                'https://pokebuildapi.fr/api/v1/pokemon/limit/100',
            );
            const jsonData = await response.json();
            setData(jsonData)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPokemonsFromPokebuild();
    }, []);

    return (
        <DataContext.Provider value={{ isLoading, data }}>
            {children}
        </DataContext.Provider>
    );
};
