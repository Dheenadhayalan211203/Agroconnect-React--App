import React, { useState, useEffect } from 'react';

const AddToCartUser2 = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(null);

  useEffect(() => {
    fetch('https://agroconnectusers-endpoints.onrender.com/api/user2')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    // Update local state
    setCart([...cart, product]);

    // Send data to API
    fetch('https://agroconnect-userpurchase-endpoint.onrender.com/api/user2purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        amount: product.amount
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Added to cart:', data);
      // Set the orderPlaced state to trigger rendering of order placed message
      setOrderPlaced(data);
    })
    .catch(error => console.error('Error adding to cart:', error));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="products-cart-cont">
        {products.map(product => (
          
          <div key={product._id} className="product-pur">
            <div className="product-pur-img"> {product.title === "tomato" ?  <img className="prodimg" src="tomatoes.jpg"></img> : <p></p>}
                {product.title === "potato" ?  <img className="prodimg" src="potatoes.jpg"></img> : <p></p>}
                {product.title === "brinjal" ?  <img className="prodimg" src="brinjal.jpg"></img> : <p></p>}
                {product.title === "jasmine" ?  <img className="prodimg" src="jasmine.jpg"></img> : <p></p>}
                {product.title === "rose" ?  <img className="prodimg" src="rose.jpg"></img> : <p></p>}
                {product.title === "rice" ?  <img className="prodimg" src="rice.jpg"></img> : <p></p>}
                {product.title === "samandhy" ?  <img className="prodimg" src="samandhy.jpg"></img> : <p></p>}</div>
            <div className='prodpurdata'> 
            <h3>{product.title}</h3>
            <p>  Rs {product.amount}</p>
            </div>
            <div className='purbut'> 
            <button onClick={() => handleAddToCart(product)}>Purchase</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cartdisp"> 
      <div  >
        <h2>Purchased Products</h2>
        <ul>
          {cart.map(item => (
            <li key={item._id}>Purchased {item.title}</li>
          ))}
        </ul>
      </div>
      {orderPlaced && (
        <div>
          <p>Order placed for {orderPlaced.title} with a price of Rs {orderPlaced.amount} per kg.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddToCartUser2;
