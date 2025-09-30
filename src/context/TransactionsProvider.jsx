import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import React, { useState, useEffect, useMemo } from "react";
import { createContext } from "react";
import { getDocs } from "firebase/firestore";

export const TransactionContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  /* querySnapshot is not an array, it’s a QuerySnapshot object.
  So you can’t do querySnapshot.map(...).
  Instead, you need to map over its .docs array: */

  const getTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    const data = querySnapshot.docs.map((doc) => {
      const raw = doc.data();
      return {
        id: doc.id,
        ...raw,
        date: raw.date.toDate(),
      };
    });
    data.sort((a,b) => a.date > b.date);
    setTransactions(data);
    // console.log(typeof data[0].date);
  };

  /* Wrapping in () tells JavaScript: “This is a single expression, specifically an object literal.”
  So it correctly returns the object from the arrow function. */
  // transactions.push(doc.data());

  const addTransaction = async (finalTransaction) => {
    await addDoc(collection(db, "transactions"), finalTransaction);
    setTransactions((prev) => [...prev, finalTransaction]);
    console.log("Transaction added Succesfully");
  };

  const deleteTransaction = async (id) => {
    const docRef = doc(db, "transactions", id);
    await deleteDoc(docRef);
    console.log("Transaction deleted Successfully");
    setTransactions(transactions.filter((t) => t.id != id));
  };

  const getPreviousFiveDates = () => {
    let dates = [];
    for(let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates.reverse();
  }

  const previousFiveDates = useMemo(() => getPreviousFiveDates(), []);

  useEffect(() => { getTransactions() }, []);

  return (
    <TransactionContext.Provider
      value={{
        addTransaction,
        transactions,
        deleteTransaction,
        setTransactions,
        getTransactions,
        previousFiveDates,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionsProvider;
