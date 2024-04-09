/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import { useState } from "react";
const Credits = ({ credits, addCredit, accountBalance }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().slice(0, 10),
    };
    addCredit(newCredit);
    setFormData({ description: "", amount: "" }); //reset after submission
  };

  let creditsView = () => {
    return credits.map((credit) => {
      // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };
  // addDebit = () => {
  //   console.log("heyyyy");
  // };
  return (
    <div>
      <h1>Credits</h1>
      <h2>Account Balance: {accountBalance.toFixed(2)}</h2>
      {creditsView()}
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
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
