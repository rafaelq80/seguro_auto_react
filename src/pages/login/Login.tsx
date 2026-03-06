import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import type UsuarioLogin from '../../models/UsuarioLogin'
import { ClipLoader } from 'react-spinners'

function Login() {
	const navigate = useNavigate()
	const { usuario, handleLogin, isLoading } = useContext(AuthContext)

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
		id: 0,
		nome: "",
		usuario: "",
		foto: "",
		senha: "",
		token: ""
	})

	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (usuario.token !== '') {
			navigate('/home')
		}
	}, [usuario])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		})
	}

	function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		handleLogin(usuarioLogin)
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-950 to-zinc-900">

			{/* ── Painel esquerdo – Formulário ── */}
			<div className="relative flex justify-center items-center w-full h-full px-8 lg:px-12">

				{/* Grade técnica de fundo */}
				<div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(249,115,22,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.4)_1px,transparent_1px)] bg-size-[50px_50px]" />

				{/* Blob laranja superior esquerdo */}
				<div className="absolute -top-24 -left-24 size-80 rounded-full blur-3xl opacity-[0.07] animate-pulse pointer-events-none bg-linear-to-br from-orange-500 to-orange-600" />

				{/* Blob laranja inferior direito */}
				<div className="absolute -bottom-24 -right-12 size-64 rounded-full blur-3xl opacity-[0.06] pointer-events-none bg-linear-to-br from-orange-700 to-orange-900" />

				{/* Linha de acento vertical direita */}
				<div className="absolute top-0 right-0 w-px h-full opacity-15 bg-linear-to-b from-transparent via-orange-500 to-transparent" />

				{/* Card do formulário */}
				<form
					className="relative flex flex-col w-full max-w-md gap-6 p-10 rounded-3xl z-10
						border border-zinc-700/40 backdrop-blur-sm
						bg-linear-to-br from-zinc-800/85 to-zinc-900/90
						shadow-2xl shadow-black/50"
					onSubmit={login}
				>
					{/* Cabeçalho */}
					<div className="text-center">
						<h2 className="text-4xl font-black tracking-tight text-zinc-100 mb-1">
							Entrar
						</h2>
						<p className="text-zinc-500 text-sm font-normal">
							Acesse sua conta para continuar
						</p>
					</div>

					{/* Campo Usuário */}
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="usuario" className="text-zinc-300 text-sm font-semibold tracking-wide">
							Usuário
						</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							placeholder="Digite seu usuário"
							className="border border-zinc-700/60 rounded-xl p-3
								bg-zinc-900/70 text-zinc-100 font-normal
								placeholder:text-zinc-600
								focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/15 focus:outline-none
								transition-all duration-300"
							value={usuarioLogin.usuario}
							onChange={atualizarEstado}
							required
						/>
					</div>

					{/* Campo Senha */}
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="senha" className="text-zinc-300 text-sm font-semibold tracking-wide">
							Senha
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="senha"
								name="senha"
								placeholder="Digite sua senha"
								className="w-full border border-zinc-700/60 rounded-xl p-3 pr-12
									bg-zinc-900/70 text-zinc-100 font-normal
									placeholder:text-zinc-600
									focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/15 focus:outline-none
									transition-all duration-300 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
								value={usuarioLogin.senha}
								onChange={atualizarEstado}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2
									text-zinc-500 hover:text-orange-400
									transition-colors duration-200 focus:outline-none"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
							>
								{showPassword
									? <EyeSlashIcon size={22} weight="regular" />
									: <EyeIcon size={22} weight="regular" />
								}
							</button>
						</div>
					</div>

					{/* Botão Entrar */}
					<button
						type="submit"
						disabled={isLoading}
						className="relative rounded-xl flex justify-center items-center overflow-hidden
							w-full py-3.5 mt-1
							text-white font-bold text-base tracking-wide
							bg-linear-to-br from-orange-500 to-orange-700
							shadow-lg shadow-orange-900/30
							hover:from-orange-400 hover:to-orange-600
							active:scale-95
							disabled:opacity-50 disabled:cursor-not-allowed
							transition-all duration-300"
					>
						{isLoading ? (
							<span className="flex items-center justify-center h-6">
								<ClipLoader color="#ffffff" size={24} />
							</span>
						) : (
							<span>Entrar</span>
						)}
					</button>

					{/* Divisor */}
					<div className="relative w-full flex items-center justify-center">
						<div className="h-px w-full bg-linear-to-r from-transparent via-zinc-700/50 to-transparent" />
						<span className="absolute bg-zinc-800/90 px-3 py-0.5 rounded-full text-zinc-500 text-xs">
							OU
						</span>
					</div>

					{/* Link Cadastro */}
					<p className="text-zinc-500 text-sm font-normal text-center">
						Ainda não tem uma conta?{' '}
						<Link
							to="/cadastro"
							className="text-orange-400 hover:text-orange-300 font-semibold hover:underline transition-colors duration-200"
						>
							Cadastre-se
						</Link>
					</p>
				</form>
			</div>

			{/* ── Painel direito – Imagem ── */}
			<div className="hidden lg:block relative w-full h-full overflow-hidden
				bg-[url('https://ik.imagekit.io/vzr6ryejm/seguros/seguro_03.jpg')]
				bg-cover bg-center">

				{/* Overlay: funde da esquerda (escuro) para a direita (sutil) */}
				<div className="absolute inset-0 bg-linear-to-r from-zinc-950/85 via-zinc-950/40 to-zinc-950/15" />

				{/* Overlay inferior para profundidade */}
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />

				{/* Linha de acento laranja na borda esquerda */}
				<div className="absolute top-0 left-0 w-px h-full opacity-20 bg-linear-to-b from-transparent via-orange-500 to-transparent" />

				{/* Badge decorativo */}
				<div className="absolute bottom-12 left-10 z-10">
					<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/8 backdrop-blur-sm">
						<span className="size-2 rounded-full bg-orange-400 animate-pulse" />
						<span className="text-orange-300/90 text-sm font-medium tracking-widest uppercase font-mono">
							Proteção Inteligente
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login