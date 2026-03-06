import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import AuthContext from "../../contexts/AuthContext";

function Footer() {
  const data = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <footer className="relative overflow-hidden bg-linear-to-b from-stone-900 via-zinc-900 to-zinc-950">

        {/* Linha divisória de entrada */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-700/50 to-transparent" />

        {/* Grade técnica de fundo */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(249,115,22,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.5)_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Orbe decorativo sutil */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-[0.06] blur-3xl pointer-events-none bg-linear-to-t from-orange-500 to-transparent" />

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">

            {/* Linha divisória com acento laranja */}
            <div className="w-full max-w-xs h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

            <p className="font-bold text-base text-zinc-400 tracking-wide">
              CRM Generation{" "}
              <span className="text-zinc-600 font-normal">|</span>{" "}
              <span className="text-zinc-500">Copyright {data}</span>
            </p>

            <p className="text-sm text-zinc-600 tracking-wide">Acesse nossas redes sociais</p>

            {/* Ícones sociais */}
            <div className="flex gap-3">
              {[
                { href: "https://www.linkedin.com/school/generationbrasil", Icon: LinkedinLogo, label: "LinkedIn" },
                { href: "https://www.instagram.com/generationbrasil", Icon: InstagramLogo, label: "Instagram" },
                { href: "https://www.facebook.com/generationbrasil", Icon: FacebookLogo, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-700/50 text-zinc-500 transition-all duration-300 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/6 hover:-translate-y-0.5"
                >
                  <Icon size={22} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <>{component}</>;
}

export default Footer;