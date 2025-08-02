import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao StockGuardian</h1>
      <button
        onClick={() => navigate("/dashboard/produtos")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ver Produtos
      </button>
      <button
        onClick={() => navigate("/dashboard/cadastrar")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Cadastrar Produto
      </button>
    </div>
  );
}

export default Home;
