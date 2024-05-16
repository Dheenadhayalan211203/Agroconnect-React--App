import React, { useState, useEffect } from 'react';
import AddToCartUser1 from './Addtocartuser1';
 

function Userdashboard1() {
  const [expenses, setExpenses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [showCart, setShowCart] = useState(false);  

  useEffect(() => {
    fetch('https://agroconnect-5vey.onrender.com/api/expenses')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched expenses:", data);
        setExpenses(data);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  useEffect(() => {
    fetch('https://agroconnect-userpurchase-endpoint.onrender.com/api/user1purchase')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched purchases:", data);
        setPurchases(data);
      })
      .catch(error => console.error('Error fetching purchases:', error));
  }, []);
 
  const handleAddProduct = async (title, amount) => {
    try {
      const response = await fetch('https://agroconnectusers-endpoints.onrender.com/api/user1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          amount: amount
        })
      });
      const newData = await response.json();
      console.log('Product added:', newData);
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <div >
        <div className='fdhead'>
          
          <h1>User1 Dashboard</h1>
          <div className="profileatri">
            <img src="" alt="profilepic" />
            <p>vishnu@gmail.com</p>
          </div>
        
        </div> 
       
       
      <button className="addtocartnavi" onClick={() => setShowCart(!showCart)}><img src='cart.jpeg'></img></button>
      {showCart && <AddToCartUser1 />}  
      </div>
      <div className="prodcard-container">
        
        {expenses.map(expense => (
          <div className='prodcard' key={expense._id}>
                 
                  
                 {expense.title === "tomato" ?  <img className="prodimg" src="tomatoes.jpg"></img> : <p></p>}
                {expense.title === "potato" ?  <img className="prodimg" src="potatoes.jpg"></img> : <p></p>}
                {expense.title === "brinjal" ?  <img className="prodimg" src="brinjal.jpg"></img> : <p></p>}
                {expense.title === "jasmine" ?  <img className="prodimg" src="jasmine.jpg"></img> : <p></p>}
                {expense.title === "rose" ?  <img className="prodimg" src="rose.jpg"></img> : <p></p>}
                {expense.title === "rice" ?  <img className="prodimg" src="rice.jpg"></img> : <p></p>}
                {expense.title === "samandhy" ?  <img className="prodimg" src="samandhy.jpg"></img> : <p></p>}
                  

            <p>Product Added On {expense.date}</p>
            <p >  {expense.title}</p>
            <p>Prise Per Kg {expense.amount}</p>
            
            <button className="addtocart" onClick={() => handleAddProduct(expense.title, expense.amount)}>
              Add Product to Cart
            </button>
          </div>
        ))}
      </div>
      <div className='udbprodpur'>
        
        
        <h2>Products You Purchased</h2>
        <div className="purprodsip"> 
        {purchases.map(purchase => (
          <div className="purchasedproductsdisp"key={purchase._id}>
            <p>Product: {purchase.title}</p>
            <p>  {purchase.amount} RS Per Kg</p>
          </div>
         
        ))}
        </div>
      </div>
    </div>
  );
}

export default Userdashboard1;
