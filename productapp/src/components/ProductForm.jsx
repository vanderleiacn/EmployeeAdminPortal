import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ fetchProducts, editingProduct, setEditingProduct }) {
  const API_URL = "https://localhost:7266/api/products"; // Ajuste para porta do backend (HTTPS)
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    if (editingProduct) {
      // Preenche o formulário com o produto que está sendo editado
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
      });
    } else {
      setForm({ name: "", price: "", description: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", price: "", description: "" });
      setEditingProduct(null);
      fetchProducts(); // Atualiza a lista após salvar
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Não foi possível salvar o produto.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <input
        name="name"
        placeholder="Produto"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Preço"
        value={form.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Descrição do Produto"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">{editingProduct ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
}
