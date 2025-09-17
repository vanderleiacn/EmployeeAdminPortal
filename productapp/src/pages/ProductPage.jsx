import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import axios from "axios";

// Ajuste para HTTPS do backend
const API_URL = "https://localhost:7266/api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Buscar produtos do backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      alert("Não foi possível carregar os produtos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastrar Produtos</h1>
      <ProductForm
        fetchProducts={fetchProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <ProductList
        products={products}
        setEditingProduct={setEditingProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
