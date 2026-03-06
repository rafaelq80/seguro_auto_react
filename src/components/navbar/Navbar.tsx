import { SignOut } from "@phosphor-icons/react";
import { type ReactNode, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    navigate("/");
  }

  const isActive = (path: string) => location.pathname === path;

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <nav className="sticky top-0 z-50 bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-950 backdrop-blur-md shadow-2xl shadow-black/40 border-b border-zinc-800/60">

        {/* Linha de acento superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/60 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/home"
              className="flex items-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://ik.imagekit.io/vzr6ryejm/seguros/logo_03.png"
                alt="Logo"
                className="w-64 drop-shadow-lg"
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {[
                { to: "/clientes", label: "Clientes" },
                { to: "/apolices", label: "Apólices" },
                { to: "/dashboard", label: "Dashboard" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 ${
                    isActive(to)
                      ? "text-orange-400 bg-orange-500/10"
                      : "text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/70"
                  }`}
                >
                  {isActive(to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-orange-500" />
                  )}
                  {label}
                </Link>
              ))}

              {/* Divider */}
              <div className="h-8 w-px bg-zinc-700/60 mx-3" />

              {/* Profile */}
              <Link to="/Perfil" className="group relative">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-linear-to-br from-orange-500 to-orange-700 opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-sm" />
                  <img
                    src={usuario.foto}
                    alt={usuario.nome}
                    className="relative w-10 h-10 rounded-full border-2 border-zinc-700 group-hover:border-orange-500/50 transition-all duration-300 shadow-lg object-cover"
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                  <div className="bg-zinc-900 text-orange-400 text-xs px-3 py-1.5 rounded-lg shadow-xl border border-zinc-700/80 whitespace-nowrap">
                    {usuario.nome}
                  </div>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="group relative flex items-center justify-center w-10 h-10 rounded-lg text-zinc-500 hover:text-orange-400 hover:bg-zinc-800/70 transition-all duration-300"
                aria-label="Sair"
              >
                <SignOut size={22} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                  <div className="bg-zinc-900 text-orange-400 text-xs px-3 py-1.5 rounded-lg shadow-xl border border-zinc-700/80 whitespace-nowrap">
                    Sair
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Gradiente de transição para o conteúdo abaixo */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-linear-to-b from-zinc-950/40 to-transparent pointer-events-none" />
      </nav>
    );
  }

  return <>{component}</>;
}

export default Navbar;