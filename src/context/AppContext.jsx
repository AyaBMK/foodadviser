import React, { createContext, useState, useEffect } from 'react';
import {get_all_ingredients} from "../services/ingredient_service"


export const AppContext = createContext();
 

const AppProvider = ({ children }) => {
    const [sharedVariable, setSharedVariable] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    // Dans AppContext (ou là où tu gères ingInFridge)
    const [ingInFridge, setInFridge] = useState(() => {
    try {
        const raw = localStorage.getItem('ingInFridge');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
    });

    useEffect(() => {
    try {
        localStorage.setItem('ingInFridge', JSON.stringify(ingInFridge || []));
    } catch {}
    }, [ingInFridge]);

    const [ingToShop, setToShop]= useState([])
    const [userIngToShop, setuserIngToShop]= useState([])
    const [fridgeImage, setFridgeImage] = useState(null);

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
        <AppContext.Provider value={{ sharedVariable, loading, error, ingInFridge, ingToShop, setInFridge, setToShop, fridgeImage, setFridgeImage,setuserIngToShop, userIngToShop}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;






