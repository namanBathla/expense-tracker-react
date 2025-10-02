import React, { useContext, useMemo } from 'react'
import PieChart from '../components/PieChart'
import { TransactionContext } from '../context/TransactionsProvider'
const Dashboard = () => {

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

export default Dashboard