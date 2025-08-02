import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro de login:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo com branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-900 text-white w-1/2 p-10">
        <h1 className="text-5xl font-bold mb-4">StockGuardian</h1>
        <p className="text-lg max-w-md text-center">
          Sistema inteligente para controle de estoque. Segurança, praticidade e performance em um só lugar.
        </p>
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
           <input
             type="email"
             name="email"
             autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
           <input
             type="password"
             name="senha"
             autoComplete="off"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
