import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CheckSquare,
  ShieldCheck,
  UserPlus,
  Heart,
  LogOut,
  Target,
} from "lucide-react";

/** Render the primary application navigation sidebar. */
function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("is_admin") === "true";

  /** Clear the stored session and redirect to the login page. */
  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("is_admin");
    void navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logoo-o-monitor.jpeg" alt="Monitor" className="brand-logo" />
      </div>

      <nav className="nav">
        <NavLink to="/disciplinas">
          <BookOpen size={18} />
          Disciplinas
        </NavLink>

        <NavLink to="/questoes">
          <CheckSquare size={18} />
          Questões
        </NavLink>

        <NavLink to="/metas">
          <Target size={18} />
          Metas
        </NavLink>

        <NavLink to="/favoritos">
          <Heart size={18} />
          Favoritos
        </NavLink>

        <NavLink to="/estatisticas">
          <BarChart3 size={18} />
          Dashboard
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/admin/disciplinas">
              <ShieldCheck size={18} />
              Admin Disciplinas
            </NavLink>

            <NavLink to="/admin/questoes">
              <ShieldCheck size={18} />
              Admin Questões
            </NavLink>

            <NavLink to="/admin/administradores">
              <UserPlus size={18} />
              Admins
            </NavLink>

            <NavLink to="/admin/cadastro">
              <UserPlus size={18} />
              Cadastrar Admin
            </NavLink>
          </>
        )}

      </nav>

      <button className="logout-button" onClick={logout}>
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );
}

export default Navbar;
