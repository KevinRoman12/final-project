function Modal({ product, onClose}) {
    if (!product) return null;

    return (
        <div style={styles.overlay}>
        <div style={styles.modal}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>

            <button onCLick={onClose}>Close</button>
        </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundcolor: "rgba(0,0,0,0,5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
    },
};

export default Modal;