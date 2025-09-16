import React, { useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddTransaction = () => {
  // const [transaction, setTransaction] = useState({});

  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
    type: "",
    category: "",
  });

  const handleChange = (e) => {
    // this [name] attribute is from the <input> tag
    let { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const addTransaction = async (finalTransaction) => {
    await addDoc(collection(db, "transactions"), finalTransaction);
    console.log("Transaction added Successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTransaction = {
      date: transaction.date || new Date().toISOString().split("T")[0],
      amount: transaction.amount,
      description: transaction.description || `Transaction on ${transaction.date}`,
      type: transaction.type || "debit",
      category: transaction.category || "General",
    };
    setTransaction(finalTransaction);
    try {
      addTransaction(finalTransaction);
      console.log("Transaction logged successfully");
      setTransaction({});
    }
    catch (error) {
      console.log("Unable to log transaction");
    }
    console.log(finalTransaction);
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4"
      >
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          name="amount"
          id=""
          placeholder="Amount"
          className="border border-black p-2 rounded-lg"
          value={transaction.amount}
          required
        />
        <input
          type="date"
          onChange={(e) => handleChange(e)}
          name="date"
          id=""
          placeholder={new Date().toISOString().split("T")[0]}
          className="border border-black p-2 rounded-lg"
          value={transaction.date}
          required
        />
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="description"
          id=""
          placeholder="Description"
          className="border border-black p-2 rounded-lg"
          value={transaction.description}
        />

        <div className="flex gap-4 border border-black p-2 rounded-lg">
          <label htmlFor="category">Type</label>
          <select
            name="type"
            id="type"
            onChange={(e) => handleChange(e)}
            className="outline-none"
            value={transaction.type}
            required
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div className="flex gap-4 border border-black p-2 rounded-lg">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => handleChange(e)}
            className="outline-none"
            value={transaction.category}
          >
            {/* <option value="" disabled selected>
              Select Category
            </option> */}
            <option value="Fixed">Fixed</option>
            <option value="Grocery">Grocery</option>
            <option value="Dairy">Dairy</option>
            <option value="Veggies">Veggies</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Vehicle">Vehicle</option>
          </select>
        </div>
        <button type="submit" className="bg-green-400 p-2 rounded-md">
          ADD
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
