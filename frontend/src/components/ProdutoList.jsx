import React from 'react';

function ProdutoList({ produtos }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">📦 Lista de Produtos</h2>
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Preço</th>
            <th className="py-3 px-4 text-left">Quantidade</th>
            <th className="py-3 px-4 text-left">Estoque Mínimo</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => {
            const isBaixoEstoque = produto.quantidade < produto.estoqueMinimo;
            return (
              <tr
                key={index}
                className={`${
                  isBaixoEstoque ? 'bg-red-100' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{produto.nome}</td>
                <td className="py-2 px-4">{produto.descricao}</td>
                <td className="py-2 px-4">R$ {parseFloat(produto.preco).toFixed(2)}</td>
                <td className="py-2 px-4">
                  {produto.quantidade}
                  {isBaixoEstoque && (
                    <span className="ml-2 text-red-600 font-semibold">⚠️ Baixo</span>
                  )}
                </td>
                <td className="py-2 px-4">{produto.estoqueMinimo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProdutoList;
