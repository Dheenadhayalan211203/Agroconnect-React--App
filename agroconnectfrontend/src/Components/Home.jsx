import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        " https://agroconnect-5vey.onrender.com/api/expenses"
      );
      setExpense(response.data);
    };
    getData();
  }, []);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const nowDate = new Date();
  const day = nowDate.getDate();
  const month = nowDate.getMonth() + 1;
  const year = nowDate.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  const calculateTotalBalance = () => {
    return expense.length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      if (!title || !amount) {
        alert("Please fill all fields");
        return;
      }
      let newItem = {
        _id: uuidv4(),
        title: title,
        amount: parseFloat(amount),
        date: currentDate,
      };
      axios
        .post(
          " https://agroconnect-5vey.onrender.com/api/expenses",
          newItem
        )
        .then(() => setExpense([...expense, newItem]));

      setTitle("");
      setAmount(0);
    } else {
      axios
        .put(
          ` https://agroconnect-5vey.onrender.com/api/expenses/${editId}`,
          { title, amount }
        )
        .then(() =>
          setExpense(
            expense.map((ite) =>
              ite._id === editId
                ? { ...ite, title, amount, date: currentDate }
                : ite
            )
          )
        );
      setTitle("");
      setAmount(0);
      setIsEdit(false);
    }
  };

  const handleEdit = (_id) => {
    setIsEdit(true);
    setEditId(_id);
    const editObj = expense.find((ite) => _id === ite._id);
    setTitle(editObj.title);
    setAmount(parseFloat(editObj.amount));
  };
  const handleDelete = (_id) => {
    axios
      .delete(
       `  https://agroconnect-5vey.onrender.com/api/expenses/${_id}`
      )
      .then(() => {
        setExpense(expense.filter((item) => item._id !== _id));
      });
  };

  return (
    <div>

      <div className="fdhead"><h2 >Farmers Dashboard</h2>
      <section className="profileatri"><img src="farmer profile.jpeg" alt="profile" /> <p>farmer@gmail.com</p></section></div> 
      <section className="usdbcont"> 
      <form className="dashbrdfrm"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
        onSubmit={(e) => handleSubmit(e)}
      >
        
        <input
          value={title}
          type="text"
          placeholder="Product name"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          value={amount}
          type="number"
          placeholder="Price per Kg"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">{isEdit ? "Update Product " : "Sell Product"}</button>
      </form>
      </section>
      <div className="noofprodadded">Number of added products: <span>{calculateTotalBalance()}</span> </div>

      <div className="prodcard-container">
      {expense.map((item) => (
  <div  className="prodcard" key={item._id}>
     
    {item.title === "tomato" ?  <img className="prodimg" src="tomatoes.jpg"></img> : <p></p>}
    {item.title === "potato" ?  <img className="prodimg" src="potatoes.jpg"></img> : <p></p>}
    {item.title === "brinjal" ?  <img className="prodimg" src="brinjal.jpg"></img> : <p></p>}
    {item.title === "jasmine" ?  <img className="prodimg" src="jasmine.jpg"></img> : <p></p>}
    {item.title === "rose" ?  <img className="prodimg" src="rose.jpg"></img> : <p></p>}
    {item.title === "rice" ?  <img className="prodimg" src="rice.jpg"></img> : <p></p>}
    {item.title === "samandhy" ?  <img className="prodimg" src="samandhy.jpg"></img> : <p></p>}

    
    <p>  {item.title}</p>
    <p>Pice Per Kilogram <span style={{ color: item.amount >= amount ? "green" : "red" }}>{item.amount}</span> Rs</p>
    <p>Date: {item.date}</p>
    <button className="editbut" style={{ padding: 7 }} onClick={() => handleEdit(item._id)}>Edit</button>
    <button className="deletebut" style={{ padding: 7 }} onClick={() => handleDelete(item._id)}>Delete</button>
  </div>
))}

      </div>
    </div>
  );
};

export default Home;
