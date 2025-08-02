import React, { useEffect, useState } from 'react';

function ProdutoForm({ produtoEditando, onSalvo }) {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    estoqueMinimo: ''
  });

  // Preenche o formulário quando estiver editando
  useEffect(() => {
    if (produtoEditando) {
      setProduto(produtoEditando);
    } else {
      setProduto({
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
        estoqueMinimo: ''
      });
    }
  }, [produtoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const metodo = produto.id ? 'PUT' : 'POST';
    const url = produto.id
      ? `http://localhost:8080/produtos/${produto.id}`
      : 'http://localhost:8080/produtos';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    })
      .then(res => res.json())
      .then(() => {
        onSalvo(); // Atualiza a lista
        setProduto({
          nome: '',
          descricao: '',
          preco: '',
          quantidade: '',
          estoqueMinimo: ''
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} />
      <input name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} />
      <input name="preco" type="number" step="0.01" placeholder="Preço" value={produto.preco} onChange={handleChange} />
      <input name="quantidade" type="number" placeholder="Quantidade" value={produto.quantidade} onChange={handleChange} />
      <input name="estoqueMinimo" type="number" placeholder="Estoque Mínimo" value={produto.estoqueMinimo} onChange={handleChange} />
      <button type="submit">{produto.id ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
}

export default ProdutoForm;
