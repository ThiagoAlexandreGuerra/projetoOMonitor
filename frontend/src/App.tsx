import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Disciplinas from "./pages/Disciplinas";
import Questoes from "./pages/Questoes";
import ResponderQuestao from "./pages/ResponderQuestao";
import Metas from "./pages/Metas";
import Favoritos from "./pages/Favoritos";
import Estatisticas from "./pages/Estatisticas";
import AdminAdministradores from "./pages/admin/AdminAdministradores";
import AdminDisciplinas from "./pages/admin/AdminDisciplinas";
import AdminQuestoes from "./pages/admin/AdminQuestoes";
import CadastrarAdministrador from "./pages/admin/CadastrarAdministrador";

/** Configure the application routes and public/private entry points. */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Navigate to="/estatisticas" replace />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/questoes" element={<Questoes />} />
        <Route path="/questoes/:id/responder" element={<ResponderQuestao />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route
          path="/admin/cadastro"
          element={
            <AdminRoute>
              <CadastrarAdministrador />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/disciplinas"
          element={
            <AdminRoute>
              <AdminDisciplinas />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/questoes"
          element={
            <AdminRoute>
              <AdminQuestoes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/administradores"
          element={
            <AdminRoute>
              <AdminAdministradores />
            </AdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
