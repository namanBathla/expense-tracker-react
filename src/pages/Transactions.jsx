import React from 'react'
import Transaction from '../components/Transaction'
import db from "../firebase.js";
import { collection, addDoc , getDocs} from "firebase/firestore";

const Transactions = () => {

  
  async function getTransactions() {
    // access the collection from db, creates if not exists
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
  }


  const addTransaction = async () => {
    await addDoc(collection(db, "transactions"), {
      amount: 10000,
      description: "Sample Amount",
      date: new Date(),
      type: "Debit",
      category: "Fixed Expense"
    });
    console.log("Transaction added Successfully");
  }


  return (
    <div>
      <Transaction/>
      <button className="p-2 rounded-lg ml-10 bg-green-600" onClick={addTransaction}>Add Transaction</button>
      <button className="p-2 rounded-lg ml-10 bg-green-600" onClick={getTransactions}>Get Trs</button>
      
    </div>
  )
}

export default Transactions