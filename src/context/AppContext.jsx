import React, { createContext, useState, useEffect } from 'react';
import {get_all_ingredients} from "../services/ingredient_service"


export const AppContext = createContext();
 

const AppProvider = ({ children }) => {
    const [sharedVariable, setSharedVariable] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    const [ingInFridge, setInFridge]= useState([])
    const [ingToShop, setToShop]= useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_all_ingredients();
                setSharedVariable(data);  
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);  

    return (
        <AppContext.Provider value={{ sharedVariable, loading, error, ingInFridge, ingToShop, setInFridge, setToShop}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
