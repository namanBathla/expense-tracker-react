import React from 'react'
import Transaction from '../components/Transaction'
import db from "../firebase.js";
import { collection, addDoc , getDocs, doc, deleteDoc} from "firebase/firestore";
import { useState } from 'react';

const Transactions = () => {

  const [transactions, setTransactions] = useState([]);


  /* querySnapshot is not an array, it’s a QuerySnapshot object.
  So you can’t do querySnapshot.map(...).
  Instead, you need to map over its .docs array: */

  async function getTransactions() {
    // access the collection from db, creates if not exists
    const querySnapshot = await getDocs(collection(db, "transactions"));
    const data = querySnapshot.docs.map((doc) => {

      // console.log(doc.data());
      return {
        id: doc.id,
      dateTime: (new Date((doc.data().date.seconds)*1000)).toLocaleString(),
      ...doc.data()
      }
      
    });

    setTransactions(data);
  }
    /* this is same as 
    data = querySnapshot.docs.map((doc) => {
      return {id: doc.id, ....doc.data()}
    }                                             */

    /* Wrapping in () tells JavaScript: “This is a single expression, specifically an object literal.”
  So it correctly returns the object from the arrow function. */
      // transactions.push(doc.data());


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

  const deleteTransaction = async (id) => {
    const docRef = doc(db, "transactions", id);
    await deleteDoc(docRef);
    console.log("Transaction deleted Successfully")
    // getTransactions();
    setTransactions(transactions.filter((t) => t.id != id));
  }


  return (
    <div>

      <div className='flex flex-col gap-4'>
        {transactions.map((transaction => {
        return <Transaction key={transaction.id} {...transaction} onClickFunc={() => {deleteTransaction(transaction.id)}}/>
      }))}

      </div>
      {/* <Transaction/> */}
      
      <button className="p-2 rounded-lg ml-10 bg-green-600" onClick={addTransaction}>Add Transaction</button>
      <button className="p-2 rounded-lg ml-10 bg-green-600" onClick={getTransactions}>Get Trs</button>
      
    </div>
  )
}

export default Transactions