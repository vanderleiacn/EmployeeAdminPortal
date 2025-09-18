import axios from "axios";
import "./ProductList.css"; // importa o CSS

export default function ProductList({ products, setEditingProduct, fetchProducts }) {
  const API_URL = "https://localhost:7266/api/products";

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Não foi possível excluir o produto.");
    }
  };

  return (
    <div className="table-container">
      {(!products || products.length === 0) ? (
        <p className="empty">Nenhum produto encontrado.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>R$ {p.price}</td>
                <td>{p.description}</td>
                <td>
                  <button className="btn-edit" onClick={() => setEditingProduct(p)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
