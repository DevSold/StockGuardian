import { useEffect, useState } from "react";
import React from "react";

function TabelaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);


  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Lista de Produtos</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-t">
              <td className="px-4 py-2">{produto.nome}</td>
              <td className="px-4 py-2">{produto.descricao}</td>
             <td className="px-4 py-2">
               {Number(produto.preco).toLocaleString("pt-BR", {
                 style: "currency",
                 currency: "BRL"
               })}
             </td>

              <td className="px-4 py-2">{produto.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaProdutos;
