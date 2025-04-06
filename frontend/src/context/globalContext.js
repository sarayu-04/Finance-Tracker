import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [Expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income) => {
        try {
            console.log("Sending income data:", income);  
            const response = await axios.post(`${BASE_URL}add-income`, income);
    
            if (response && response.data) {
                console.log("Income added successfully:", response.data); 
                setIncomes([...incomes, response.data]);
            } else {
                console.error("Unexpected API response:", response);
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <GlobalContext.Provider value={{ addIncome }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
