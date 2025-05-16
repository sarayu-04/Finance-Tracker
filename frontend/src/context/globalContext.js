import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => setError(err.response.data.message));
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        console.log("Fetched Incomes:", response.data);  
        setIncomes(response.data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    
    const addExpense = async (expense) => {  
        console.log("Sending Expense Data:", expense);
        await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) => setError(err.response.data.message));
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        console.log("Fetched Expenses:", response.data);  
        response.data.forEach(expense => console.log(`Expense -> ID: ${expense._id}, Type: ${expense.type}, Amount: ${expense.amount}`)); // ✅ Detailed Debugging Log
        setExpenses(response.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);  
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log("Transaction History:", history);  
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};