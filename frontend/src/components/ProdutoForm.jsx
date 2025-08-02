import React, { useState } from 'react';
import NumberFormat from "react-number-format";

function ProdutoForm({ onProdutoAdicionado }) {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    estoqueMinimo: '',
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!produto.nome || !produto.preco || !produto.quantidade) return;

    onProdutoAdicionado(produto);
    setProduto({
      nome: '',
      descricao: '',
      preco: '',
      quantidade: '',
      estoqueMinimo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
      <input
        className="border rounded p-2"
        type="text"
        name="nome"
        placeholder="Nome"
        value={produto.nome}
        onChange={handleChange}
      />
      <input
        className="border rounded p-2"
        type="text"
        name="descricao"
        placeholder="Descrição"
        value={produto.descricao}
        onChange={handleChange}
      />
    <NumberFormat
      value={produto.preco}
      onValueChange={(values) => {
        const { floatValue } = values;
        setProduto({ ...produto, preco: floatValue });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      className="w-full p-2 border rounded"
      placeholder="Preço"
    />


      <input
        className="border rounded p-2"
        type="number"
        name="quantidade"
        placeholder="Quantidade"
        value={produto.quantidade}
        onChange={handleChange}
      />
      <input
        className="border rounded p-2"
        type="number"
        name="estoqueMinimo"
        placeholder="Estoque Mínimo"
        value={produto.estoqueMinimo}
        onChange={handleChange}
      />
      <button
        className="col-span-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        type="submit"
      >
        Cadastrar Produto
      </button>
    </form>
  );
}

export default ProdutoForm;
