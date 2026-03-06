import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { usuario, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info");
      }
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex justify-center items-center overflow-hidden relative bg-linear-to-b from-zinc-950 via-zinc-900 to-stone-900">

      {/* Fade de entrada vindo da navbar */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-zinc-950 to-transparent pointer-events-none z-10" />

      {/* Grade técnica de fundo */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(249,115,22,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.4)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Blob superior esquerdo */}
      <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full opacity-[0.08] blur-3xl animate-pulse bg-linear-to-br from-orange-500 to-orange-700" />

      {/* Blob inferior direito */}
      <div className="absolute -bottom-32 -right-32 w-125 h-125 rounded-full opacity-[0.08] blur-3xl animate-pulse delay-1000 bg-linear-to-br from-orange-700 to-orange-900" />

      {/* Linha vertical decorativa */}
      <div className="absolute top-0 right-1/3 w-px h-full opacity-[0.08] bg-linear-to-b from-transparent via-orange-500 to-transparent" />

      {/* Orbe central sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 rounded-full opacity-[0.04] blur-3xl pointer-events-none bg-linear-to-r from-orange-500 to-transparent" />

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-16 py-16 relative z-10">

        {/* Coluna de Texto */}
        <div className="flex flex-col gap-8 items-center lg:items-start justify-center py-8">

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/8 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300/90 text-sm font-medium tracking-widest uppercase font-mono">
              Proteção Inteligente
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-zinc-100 text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Seu veículo.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-orange-700">
                Nossa missão.
              </span>
            </h2>

            <div className="h-0.5 w-20 rounded-full bg-linear-to-r from-orange-500 to-orange-700" />

            <p className="text-zinc-400 text-xl lg:text-2xl leading-relaxed font-serif">
              Seguro de automóveis com cobertura completa e a melhor relação custo-benefício do mercado.
            </p>
          </div>

          {/* Cards de recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Cobertura Total",
                desc: "Proteção contra colisão, roubo, incêndio e danos a terceiros"
              },
              {
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                title: "Gestão de Apólices",
                desc: "Controle todas as apólices dos seus clientes em um só lugar"
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl p-6 border border-zinc-700/40 bg-linear-to-br from-zinc-800/80 to-zinc-900/90 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="size-12 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br from-orange-500 to-orange-700">
                  <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </div>
                <h3 className="text-zinc-100 font-bold text-lg mb-2 font-serif">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de Imagem */}
        <div className="flex justify-center items-center lg:justify-end">
          <div className="relative">

            {/* Brilho atrás da imagem */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 animate-pulse bg-linear-to-br from-orange-500 to-orange-700" />

            {/* Placa superior - apólices */}
            <div className="absolute -top-6 -right-6 z-20 rounded-2xl px-5 py-3 shadow-2xl shadow-orange-900/40 border border-orange-400/20 bg-linear-to-br from-orange-500 to-orange-700">
              <p className="text-orange-100 text-xs font-semibold uppercase tracking-widest font-mono">Apólices Ativas</p>
              <p className="text-white text-3xl font-black">12.4k</p>
            </div>

            {/* Placa inferior - sinistros */}
            <div className="absolute -bottom-4 -left-6 z-20 rounded-2xl px-5 py-3 shadow-2xl shadow-black/50 backdrop-blur-md border border-zinc-700/60 bg-linear-to-br from-zinc-950/97 to-zinc-900/97">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest font-mono">Sinistros resolvidos</p>
              <p className="text-orange-400 text-3xl font-black">98%</p>
            </div>

            <img
              src="https://ik.imagekit.io/vzr6ryejm/seguros/home_03.png"
              alt="Seguro de Automóveis"
              className="relative w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>

      {/* Fade de saída para o footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-stone-900 pointer-events-none z-10" />
    </div>
  );
}

export default Home;