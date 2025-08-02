import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

function CreateProduct() {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: ""
  });

  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};
    if (!produto.nome) novosErros.nome = "Nome é obrigatório";
    if (produto.preco <= 0) novosErros.preco = "Preço deve ser maior que zero";
    if (!produto.quantidade) novosErros.quantidade = "Quantidade é obrigatória";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!validar()) return;

   const token = localStorage.getItem("token"); // <-- Aqui está o token

   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}` // <-- Aqui você adiciona no header
       },
       body: JSON.stringify(produto)
     });

     if (response.ok) {
       alert("Produto cadastrado com sucesso!");
       setProduto({ nome: "", descricao: "", preco: 0, quantidade: "" });
       setErros({});
     } else {
       alert("Erro ao cadastrar produto.");
     }
   } catch (error) {
     console.error("Erro:", error);
     alert("Erro ao conectar com o servidor.");
   }
 };


  return (
    <div className="p-6 bg-gray-100 rounded shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <input
            type="text"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            className={`w-full p-2 border ${
              erros.nome ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {erros.nome && <p className="text-red-500 text-sm">{erros.nome}</p>}
        </div>

        {/* Descrição */}
        <div>
          <input
            type="text"
            placeholder="Descrição"
            value={produto.descricao}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Preço com máscara */}
        <div>
          <NumericFormat
            value={produto.preco}
            onValueChange={(values) => {
              const { floatValue } = values;
              setProduto({ ...produto, preco: floatValue || 0 });
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale
            decimalScale={2}
            allowNegative={false}
            allowEmptyFormatting
            className={`w-full p-2 border ${
              erros.preco ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Preço"
          />
          {erros.preco && <p className="text-red-500 text-sm">{erros.preco}</p>}
        </div>

        {/* Quantidade */}
        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={produto.quantidade}
            onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })}
            className={`w-full p-2 border ${
              erros.quantidade ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {erros.quantidade && (
            <p className="text-red-500 text-sm">{erros.quantidade}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
