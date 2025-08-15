const express = require('express');
const router = express.Router();
const {getExpense,createExpense}=require('../controllers/expenseController')
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validation');


router.route('/').post([
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  body('date').isISO8601().toDate().withMessage('Invalid date format')
],validateRequest,createExpense)


module.exports=router
