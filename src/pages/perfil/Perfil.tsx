import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();
  const { usuario, isLogout } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info");
      }
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="flex justify-center min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-stone-900 py-10">

      {/* Grade técnica de fundo */}
      <div className="fixed inset-0 opacity-[0.04] bg-[linear-gradient(rgba(249,115,22,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.4)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      {/* Blob decorativo superior esquerdo */}
      <div className="fixed -top-32 -left-32 size-96 rounded-full blur-3xl opacity-[0.06] animate-pulse pointer-events-none bg-linear-to-br from-orange-500 to-orange-700" />

      {/* Blob decorativo inferior direito */}
      <div className="fixed -bottom-32 -right-32 size-96 rounded-full blur-3xl opacity-[0.06] animate-pulse delay-1000 pointer-events-none bg-linear-to-br from-orange-700 to-orange-900" />

      <div className="relative z-10 w-full max-w-7xl mx-4">
        <div className="rounded-3xl overflow-hidden border border-zinc-700/40 shadow-2xl shadow-black/50 bg-linear-to-br from-zinc-800/80 to-zinc-900/90 backdrop-blur-sm">

          {/* Imagem de Capa */}
          <div className="relative h-72 overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src="https://ik.imagekit.io/vzr6ryejm/seguros/seguro_05.jpg"
              alt="Capa do Perfil"
            />
            {/* Overlay escuro sobre a capa */}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

            {/* Linha de acento laranja no topo */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/60 to-transparent" />

            {/* Badge decorativo */}
            <div className="absolute top-5 right-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/8 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-orange-300/90 text-xs font-medium tracking-widest uppercase font-mono">
                  Perfil
                </span>
              </div>
            </div>
          </div>

          {/* Foto de Perfil + Informações */}
          <div className="relative px-8">

            {/* Foto de Perfil */}
            <div className="flex justify-center">
              <div className="relative -mt-20 z-10">

                {/* Anel laranja de destaque */}
                <div className="absolute -inset-1 rounded-full bg-linear-to-br from-orange-500 to-orange-700 opacity-60 blur-sm" />

                <img
                  className="relative w-40 h-40 rounded-full border-4 border-zinc-800 shadow-2xl shadow-black/60 object-cover"
                  src={usuario.foto}
                  alt={`Foto de perfil de ${usuario.nome}`}
                />

                {/* Indicador online */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-800 shadow-lg" />
              </div>
            </div>

            {/* Informações do Usuário */}
            <div className="text-center mt-5 pb-10">

              <h1 className="text-3xl font-black tracking-tight text-zinc-100 mb-1">
                {usuario.nome}
              </h1>

              <p className="text-zinc-500 text-sm font-mono mb-6">
                {usuario.usuario}
              </p>

              {/* Linha divisória */}
              <div className="h-px w-32 mx-auto bg-linear-to-r from-transparent via-orange-500/40 to-transparent mb-6" />

              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Perfil;