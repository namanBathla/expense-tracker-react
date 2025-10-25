import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionsProvider";
import { MdDeleteOutline } from "react-icons/md";

const Transaction = ({date,amount,description,category,type,id,showDelete = true, blackText}) => {
  const { deleteTransaction } = useContext(TransactionContext);
  const isExpense = () =>type === "debit";

  const textColor = blackText ? "text-gray-900" : (type === "credit" ? "text-green-700" : "text-red-700");

  return (
    <div className={`transaction-box w-full ${textColor} p-3 rounded-2xl shadow-md bg-white `}>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center items-center">
        <div>
          <span className="sm:hidden inline text-black">Date: </span>
          {date.toLocaleDateString()}
        </div>
        <div>
          <span className="sm:hidden inline text-black">Amt: </span>
          {`₹${amount}`}
        </div>
        <div>
          <span className="sm:hidden inline text-black">Desc: </span>
          {description}
        </div>
        <div>
          <span className="sm:hidden inline text-black">Catg: </span>
          {category}
        </div>
        {showDelete && (
          <button
            className="text-red-700 w-10 h-8 rounded-lg flex justify-center items-center mx-auto sm:mx-0"
            onClick={() => deleteTransaction(id)}
          >
            <MdDeleteOutline className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Transaction;
