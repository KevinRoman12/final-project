function Navbar({ cart, totalPrice, clearCart }) {
    return (
        <div>
            <h1>The Nexus E-Commerce Suite</h1>
            <h2>Cart Items: {cart.length}</h2>
            <h2>Total Price: ${totalPrice}</h2>

            <button onClick={clearCart}
            style={{
                margin:"5px",
                padding:"8px 12px",
                backgroundColor:"#C41E3A",
                color:"white",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer"
            }}    
            >
                Clear Cart  
            </button>
        </div>
    );
}

export default Navbar;