/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import { useState } from "react";

const Debits = ({ debits, addDebit, accountBalance }) => {
  // using desconstructed instead of props
  const [formData, setFormData] = useState({
    // used to store form data
    description: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().slice(0, 10),
    };
    addDebit(newDebit);
    setFormData({ description: "", amount: "" }); //reset once we have submitted
  };

  let debitsView = () => {
    return debits.map((debit) => {
      // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          {debit.amount} {debit.description} {date}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Debits</h1>
      <h2>Account Balance: {accountBalance.toFixed(2)}</h2>
      {debitsView()}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <button type="submit">Add Purchase</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
