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
    <div className="main-page-container flex flex-col gap-10 px-6 py-8 bg-slate-50 min-h-screen">
        <div className="heading flex flex-col mb-4">
          <h2 className="text-2xl font-semibold text-blue-700 text-center sm:text-left">
            Reports
          </h2>
          <p className="text-slate-600">Your spending overview at a glance.</p>
        </div>

      <div><PieChart data={categoryWiseExpense}/></div>
    </div>
    </>
  )
}

export default Reports