import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token
    navigate("/"); // Redireciona para a tela de login
  };

  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">StockGuardian</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:underline">
            🏠 Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => navigate(-1)}
            className="hover:underline w-full text-left"
          >
            🔙 Voltar
          </button>
        </li>
        <li>
          <Link to="/dashboard/produtos" className="hover:underline">
            📦 Ver Produtos
          </Link>
        </li>
        <li>
          <Link to="/dashboard/cadastrar" className="hover:underline">
            ➕ Cadastrar Produto
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="hover:underline w-full text-left text-red-400"
          >
            🚪 Sair
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
