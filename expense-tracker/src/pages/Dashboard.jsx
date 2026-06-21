import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.log(error));
  }, []);

  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Expense Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          onClick={() => navigate(`/expenses/${expense.month}`)}
          className="bg-white rounded-xl shadow-md border p-6 cursor-pointer 
                     hover:shadow-lg hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-semibold mb-2">{expense.month}</h3>
          
        </div>
      ))}
    </div>
  </div>
);

};

export default Dashboard;