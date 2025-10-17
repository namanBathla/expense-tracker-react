import React from 'react'
import { useContext, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionsProvider';
import PieChart from '../components/PieChart';

const Reports = () => {
  const {transactions} = useContext(TransactionContext);


  const isExpense = (t) => t.type === "debit";

  const getCategoryWiseExpense = () => {
    const categoryWiseExpenses = {};

    transactions.forEach((t) => {
      if(isExpense(t)) {
        const key = t.category;
        const amountToAdd = t.amount;
        categoryWiseExpenses[key] = (categoryWiseExpenses[key] || 0) + amountToAdd;
      }
    });

    return categoryWiseExpenses;
  }

  const categoryWiseExpense = useMemo(() => getCategoryWiseExpense(), [transactions]);

  return (
    <>
    <div>Dashboard</div>
    <div><PieChart data={categoryWiseExpense}/></div>
    </>
  )
}

export default Reports