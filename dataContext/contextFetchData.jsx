import React, { createContext, useContext, useState } from 'react';

import { useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [numberItem, setNumberItem] = useState(120);

    const getPokemonsFromPokebuild = async () => {

        try {
            setLoading(true); 
            const response = await fetch(
                `https://pokebuildapi.fr/api/v1/pokemon/limit/${numberItem}`,
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
    }, [numberItem]);

    return (
        <DataContext.Provider value={{ isLoading, data, numberItem, setNumberItem }}>
            {children}
        </DataContext.Provider>
    );
};
