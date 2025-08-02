import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import TabelaProdutos from "./components/TabelaProdutos";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Ao acessar /dashboard, abre Home com os botões */}
          <Route index element={<Home />} />

          {/* As rotas abaixo só aparecem se clicar nos botões */}
          <Route path="produtos" element={<TabelaProdutos />} />
          <Route path="cadastrar" element={<CreateProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
