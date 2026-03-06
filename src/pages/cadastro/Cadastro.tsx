import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { cadastrarUsuario } from "../../services/Service"
import {
	validarCampoCadastro,
	validarFormularioCadastro,
	formularioValido,
} from "../../validations/ValidacaoCadastro"

function Cadastro() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [confirmaSenha, setConfirmaSenha] = useState<string>("")
	const [erros, setErros] = useState<Record<string, string>>({})

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: "",
	})

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar()
		}
	}, [usuario])

	function retornar() {
		navigate("/login")
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setUsuario({ ...usuario, [name]: value })
		const erro = validarCampoCadastro(name, value)
		setErros((prev) => ({ ...prev, [name]: erro }))
	}

	function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
		const valor = e.target.value
		setConfirmaSenha(valor)
		const erro = validarCampoCadastro("confirmaSenha", valor)
		setErros((prev) => ({ ...prev, confirmaSenha: erro }))
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const errosValidacao = validarFormularioCadastro(usuario, confirmaSenha)
		setErros(errosValidacao)

		if (!formularioValido(errosValidacao)) {
			ToastAlerta("Por favor, corrija os erros no formulário", "erro")
			return
		}

		setIsLoading(true)
		try {
			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
			ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
		} catch (error) {
			ToastAlerta("Erro ao cadastrar o usuário!", "erro")
		}
		setIsLoading(false)
	}

	// Classes reutilizáveis para inputs
	const inputBase = "w-full border rounded-xl px-4 py-2.5 bg-zinc-900/70 text-zinc-100 text-sm font-normal placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all duration-300"
	const inputOk   = "border-zinc-700/60 focus:border-orange-500/60 focus:ring-orange-500/15"
	const inputErr  = "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/15"

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-950 to-zinc-900">

			{/* ── Painel esquerdo – Imagem ── */}
			<div className="hidden lg:block relative w-full h-full overflow-hidden
				bg-[url('https://ik.imagekit.io/vzr6ryejm/seguros/seguro_04.png')]
				bg-cover bg-center">

				{/* Overlay: funde da direita (escuro) para a esquerda (sutil) */}
				<div className="absolute inset-0 bg-linear-to-l from-zinc-950/85 via-zinc-950/40 to-zinc-950/15" />

				{/* Overlay inferior para profundidade */}
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />

				{/* Linha de acento laranja na borda direita */}
				<div className="absolute top-0 right-0 w-px h-full opacity-20 bg-linear-to-b from-transparent via-orange-500 to-transparent" />

				{/* Badge decorativo */}
				<div className="absolute bottom-12 right-10 z-10">
					<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/8 backdrop-blur-sm">
						<span className="size-2 rounded-full bg-orange-400 animate-pulse" />
						<span className="text-orange-300/90 text-sm font-medium tracking-widest uppercase font-mono">
							Proteção Inteligente
						</span>
					</div>
				</div>
			</div>

			{/* ── Painel direito – Formulário ── */}
			<div className="relative flex justify-center items-center w-full h-full px-8 lg:px-12 overflow-hidden">

				{/* Grade técnica de fundo */}
				<div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(249,115,22,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.4)_1px,transparent_1px)] bg-size-[50px_50px]" />

				{/* Blob laranja superior direito */}
				<div className="absolute -top-24 -right-24 size-80 rounded-full blur-3xl opacity-[0.07] animate-pulse pointer-events-none bg-linear-to-br from-orange-500 to-orange-600" />

				{/* Blob laranja inferior esquerdo */}
				<div className="absolute -bottom-24 -left-12 size-64 rounded-full blur-3xl opacity-[0.06] pointer-events-none bg-linear-to-br from-orange-700 to-orange-900" />

				{/* Linha de acento vertical esquerda */}
				<div className="absolute top-0 left-0 w-px h-full opacity-15 bg-linear-to-b from-transparent via-orange-500 to-transparent" />

				{/* Card do formulário */}
				<form
					className="relative flex flex-col w-full max-w-md gap-3 py-6 px-10 rounded-3xl z-10
						border border-zinc-700/40 backdrop-blur-sm
						bg-linear-to-br from-zinc-800/85 to-zinc-900/90
						shadow-2xl shadow-black/50"
					onSubmit={cadastrarNovoUsuario}
				>

					{/* Cabeçalho */}
					<div className="text-center">
						<h2 className="text-2xl font-black tracking-tight text-zinc-100 mb-0.5">
							Criar conta
						</h2>
						<p className="text-zinc-500 text-xs font-normal">
							Preencha os dados abaixo para se cadastrar
						</p>
					</div>

					{/* Campo Nome */}
					<div className="flex flex-col w-full gap-1.5">
						<label htmlFor="nome" className="text-zinc-300 text-sm font-semibold tracking-wide">
							Nome Completo
						</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Digite seu nome completo"
							className={`${inputBase} ${erros.nome ? inputErr : inputOk}`}
							value={usuario.nome}
							onChange={atualizarEstado}
							required
						/>
						{erros.nome && (
							<span className="text-red-400 text-xs">{erros.nome}</span>
						)}
					</div>

					{/* Campo E-mail */}
					<div className="flex flex-col w-full gap-1.5">
						<label htmlFor="usuario" className="text-zinc-300 text-sm font-semibold tracking-wide">
							E-mail
						</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="seu@email.com"
							className={`${inputBase} ${erros.usuario ? inputErr : inputOk}`}
							value={usuario.usuario}
							onChange={atualizarEstado}
							required
						/>
						{erros.usuario && (
							<span className="text-red-400 text-xs">{erros.usuario}</span>
						)}
					</div>

					{/* Campo Foto */}
					<div className="flex flex-col w-full gap-1.5">
						<label htmlFor="foto" className="text-zinc-300 text-sm font-semibold tracking-wide">
							Foto <span className="text-zinc-600 font-normal">(URL)</span>
						</label>
						<input
							type="url"
							id="foto"
							name="foto"
							placeholder="https://..."
							className={`${inputBase} ${erros.foto ? inputErr : inputOk}`}
							value={usuario.foto}
							onChange={atualizarEstado}
							required
						/>
						{erros.foto && (
							<span className="text-red-400 text-xs">{erros.foto}</span>
						)}
					</div>

					{/* Campos Senha e Confirmar Senha */}
					<div className="flex gap-3 w-full">
						<div className="flex flex-col w-1/2 gap-1.5">
							<label htmlFor="senha" className="text-zinc-300 text-sm font-semibold tracking-wide">
								Senha
							</label>
							<input
								type="password"
								id="senha"
								name="senha"
								placeholder="Mín. 8 caracteres"
								className={`${inputBase} ${erros.senha ? inputErr : inputOk}`}
								value={usuario.senha}
								onChange={atualizarEstado}
								minLength={8}
								required
							/>
							{erros.senha && (
								<span className="text-red-400 text-xs">{erros.senha}</span>
							)}
						</div>

						<div className="flex flex-col w-1/2 gap-1.5">
							<label htmlFor="confirmarSenha" className="text-zinc-300 text-sm font-semibold tracking-wide">
								Confirmar
							</label>
							<input
								type="password"
								id="confirmarSenha"
								name="confirmarSenha"
								placeholder="Digite novamente"
								className={`${inputBase} ${erros.confirmaSenha || erros.senhasIguais ? inputErr : inputOk}`}
								value={confirmaSenha}
								onChange={handleConfirmaSenha}
								minLength={8}
								required
							/>
							{erros.confirmaSenha && (
								<span className="text-red-400 text-xs">{erros.confirmaSenha}</span>
							)}
							{erros.senhasIguais && (
								<span className="text-red-400 text-xs">{erros.senhasIguais}</span>
							)}
						</div>
					</div>

					<span className="text-xs text-zinc-600 font-normal text-center w-full">
						A senha deve ter no mínimo 8 caracteres
					</span>

					{/* Linha divisória */}
					<div className="h-px w-full bg-linear-to-r from-transparent via-zinc-700/50 to-transparent" />

					{/* Botões */}
					<div className="flex gap-3 w-full">
						<button
							type="button"
							className="rounded-xl w-1/2 py-2 text-sm font-semibold
								text-zinc-400 border border-zinc-700/60 bg-zinc-800/50
								hover:bg-zinc-700/50 hover:text-zinc-200 hover:border-zinc-600
								active:scale-95 transition-all duration-300"
							onClick={retornar}
						>
							Cancelar
						</button>

						<button
							type="submit"
							disabled={isLoading}
							className="rounded-xl w-1/2 py-2 text-sm font-bold
								flex justify-center items-center
								text-white bg-linear-to-br from-orange-500 to-orange-700
								shadow-lg shadow-orange-900/30
								hover:from-orange-400 hover:to-orange-600
								active:scale-95
								disabled:opacity-50 disabled:cursor-not-allowed
								transition-all duration-300"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={20} />
							) : (
								<span>Cadastrar</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Cadastro