import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ExpenseDetails() {
  const { month } = useParams();
  const [receipts, setReceipts] = useState([]);
  const [desc,setdesc]=useState("")
  const [amount,setamount]=useState("")


  useEffect(() => {
    fetch(`http://localhost:5000/receipts?month=${month}`)
      .then((res) => res.json())
      .then((data) => setReceipts(data))
      .catch((err) => console.log(err));
  }, [month]);
const submit = async(e)=>{
  e.preventDefault()

const newreceipt ={
  description:desc,
  amount:amount,
  timestamp:new Date().toISOString(),
  month:month
}

try {
  const res = await fetch("http://localhost:5000/receipts",{
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newreceipt)
  })
  const data =await res.json()
  setReceipts([...receipts,data])
  setamount("")
  setdesc("")

} catch (error) {
  console.log("error adding in receipt",error)
}
}
const deleteReceipt = async (id) =>{
  await fetch(`http://localhost:5000/receipts/${id}`, {
    method: "DELETE",
  });

  setReceipts(receipts.filter((receipt) => receipt.id !== id));
}
const updateReceipt = async (id, amount) => {
  const response = await fetch(
    `http://localhost:5000/receipts/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
      }),
    }
  );

  const updatedReceipt = await response.json();

  setReceipts(
    receipts.map((receipt) =>
      receipt.id === id ? updatedReceipt : receipt
    )
  );
};



  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-6">Expense Details Page</h1>
      <h2 className="text-xl font-semibold mb-5">Receipts for {month}</h2>
<form action="" onSubmit={submit}>
<div className="mb-4">
  <label className="block text-sm font-medium mb-2.5">Description</label>
<input type="text" value={desc} onChange={(e)=>setdesc(e.target.value)} 
className="w-70 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required/>
            </div>
<div className="mb-4">
  
  
  <label htmlFor="" className="block text-sm font-medium mb-2.5">Amount</label>
  <input type="number" value={amount} onChange={(e)=>setamount(e.target.value)} className="w-70 border rounded-lg px-3 
  py-2 focus:outline-none focus:ring focus:border-blue-500"
            required/>


</div>
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4">Add Receipt</button>
</form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {receipts.map((receipt) => (
    <div
      key={receipt.id}
      className="bg-white border rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg hover:scale-105 transition-transform"
    >
      <div>
        <h3 className="text-lg font-semibold">{receipt.description}</h3>
        <p className="text-gray-700">Amount: ₹{receipt.amount}</p>
        <p className="text-sm text-gray-500">{receipt.timestamp}</p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          className="bg-gray-500 text-white rounded-lg px-3 py-1 hover:bg-gray-600"
          onClick={() => {const newAmount = prompt(
      "Enter new amount",
      receipt.amount
    );

    if (newAmount) {
      updateReceipt(receipt.id, newAmount);
    }}}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600"
          onClick={() => deleteReceipt(receipt.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default ExpenseDetails;
