import axios from "axios";

export default function ProductList({ products, setEditingProduct, fetchProducts }) {
  const API_URL = "https://localhost:7266/api/products"; // Ajuste para porta do backend (HTTPS)

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Não foi possível excluir o produto.");
    }
  };

  if (!products || products.length === 0) return <p>Nenhum produto encontrado.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>R$ {p.price.toFixed(2)}</td>
            <td>{p.description}</td>
            <td>
              <button onClick={() => setEditingProduct(p)}>Editar</button>
              <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "10px" }}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
