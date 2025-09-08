import React from 'react'
import Transaction from '../components/Transaction'
import db from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

const Transactions = () => {

  

  async function getTransactions(db) {
    // access the collection from db, creates if not exists
    const transactionsCol = collection(db, 'transactions');

  }


  const addTransaction = async () => {
    await addDoc(collection(db, "transactions"), {
      amount: 10000,
      description: "Sample Amount",
      date: new Date(),
      type: "Debit",
      category: "Fixed Expense"
    });
    alert("Transaction added Successfully");
  }


  return (
    <div>
      <Transaction/>
      <button className="p-2 rounded-lg ml-10 bg-green-600" onClick={addTransaction}>Add Transaction</button>
    </div>
  )
}

export default Transactions