const Expenses = require('../models/expenseSchema');

const createExpense = async (req, res) => {
  try {
    // Extract fields from request body
    const { title, amount, category, date } = req.body;
    const userId = req.user.id;


    // Create new expense
    const expense = await Expenses.create({
      title,
      amount,
      category,
      date,
      userId: userId
    });

    res.status(201).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create expense',
      error: error.message,
    });
  }
};


const getExpense=()=>{}

const updateExpense=()=>{}

const deleteExpense=()=>{}


module.exports={createExpense,getExpense,updateExpense,deleteExpense}