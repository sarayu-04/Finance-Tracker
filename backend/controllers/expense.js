const ExpenseSchema = require("../models/expenseModel"); 

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({  
        title,
        amount,
        category,
        description,
        date,
        type: "expense"  
    });

    try {
        
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!amount || isNaN(amount) || amount <= 0) {  
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        
        await expense.save();
        res.status(200).json({ message: "Expense Added Successfully", expense });  
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

    console.log("Saved Expense:", expense);  
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 }); 
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Expense Deleted" });
        })
        .catch(() => {
            res.status(500).json({ message: "Server Error" });
        });
};