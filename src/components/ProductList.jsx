function ProductList({ products, addToCart, setSelectedProduct, toggleWishlist, wishlist }) {
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3 onClick={() => setSelectedProduct(product)} stle={{cursor: "pointer" }}> 
                        {product.name}</h3>
                    <p>${product.price}</p>
                    <p>Stock: {product.stock}</p>

                    <button 
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        style={{
                            margin:"5px",
                            padding:"8px 12px",
                            backgroundColor: product.stock === 0 ? "#ccc" : "#007bff",
                            color:"white",
                            border:"none",
                            borderRadius:"5px",
                            cursor: product.stock === 0 ? "not-allowed" : "pointer"
                        }}
                    >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>

                    <button onClick={() => toggleWishlist(product)}
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
                        {wishlist.find((iten) => iten.id === product.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;