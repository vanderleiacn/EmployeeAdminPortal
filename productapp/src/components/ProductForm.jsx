// ProductForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css"; 
import "../buttons.css"; // importa os estilos globais de botões

export default function ProductForm({ fetchProducts, editingProduct, setEditingProduct }) {
  const API_URL = "https://localhost:7266/api/products";
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
    else setForm({ name: "", price: "", description: "" });
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) await axios.put(`${API_URL}/${editingProduct.id}`, form);
      else await axios.post(API_URL, form);

      setForm({ name: "", price: "", description: "" });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Não foi possível salvar o produto.");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "✏️ Editar Produto" : "➕ Cadastrar Produto"}</h2>
      <input name="name" placeholder="Produto" value={form.name} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Preço" value={form.price} onChange={handleChange} required />
      <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
      
      {/* botão estilizado */}
      <button type="submit" className="btn-submit">
        {editingProduct ? "Atualizar" : "Adicionar"}
      </button>

    </form>
  );
}
