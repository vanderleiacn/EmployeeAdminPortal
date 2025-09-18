import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import "./ProductPage.css"; // CSS específico da página
import axios from "axios";

const API_URL = "https://localhost:7266/api/products";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h1></h1>
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
