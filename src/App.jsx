import { useState, useEffect } from "react";
import productsData from "./data";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";

function App() {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const[discount, setDiscount] = useState(0);
  const totalPrice = subtotal - subtotal * discount;
  
  const addToCart = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.stock > 0) {
        return { ...product, stock: product.stock -1};
      }
      return product;
    });

    const product = products.find((p) => p.id === id);
    if (product.stock > 0) {
      setCart([...cart, product]);
      setProducts(updatedProducts);
    }
  };

    const filteredProducts = products
    .filter((product) => 
    category === "All" ? true : product.category === category)
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  const applyPromo = () => {
    if (promoCode === "OAKLAND20") {
      setDiscount(0.2);
    } else {
      alert("Invalid Promo Code");
    }
  };

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };


  
  return (
    <div>
      <Navbar cart={cart} totalPrice={totalPrice} clearCart={clearCart} />
      <div>
        <label> Sort By Category: </label>
        <select onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Devices">Devices</option>
        <option value="Extras">Extras</option>
        </select>

        <label>Sort By Price: </label>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <h2>Wishlist</h2>
      <ul> {wishlist.map((item) => (
        <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <ProductList products={filteredProducts} addToCart={addToCart} setSelectedProduct={setSelectedProduct} 
        toggleWishlist={toggleWishlist} wishlist={wishlist} />
      <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <div>
        <h3>Promotion Code</h3>
        <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Enter Promo Code" />
        <button onClick={applyPromo}>Apply</button>
      </div>
    </div>
  );

  
}

export default App;