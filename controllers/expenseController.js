const Expenses = require("../models/expenseSchema");

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
      userId: userId,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expenses.find({ userId: userId }).sort({ date: -1 });

    res.status(200).json({ expenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch expenses", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const { title, amount, category, date } = req.body;

    const expense = await Expenses.findOne({
      _id: expenseId,
      userId: req.user.id,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;

    const updatedExpense = await expense.save();
    res
      .status(200)
      .json({ message: "Expense updated", expense: updatedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update expense", error: error.message });
  }
};

module.exports = { createExpense, getExpense, updateExpense, deleteExpense };
