import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { NumericFormat } from "react-number-format"
import AuthContext from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import type Seguro from "../../../models/Seguro"
import { atualizar, cadastrar, listar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import {
	formularioValido,
	validarCampoSeguro,
	validarFormularioSeguro,
} from "../../../validations/ValidacaoSeguro"

function FormSeguro() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const hoje = new Date().toISOString().split("T")[0]
	const umAnoAFrente = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
		.toISOString()
		.split("T")[0]

	const [seguro, setSeguro] = useState<Seguro>({
		dataInicio: hoje as unknown as Date,
		dataFim: umAnoAFrente as unknown as Date,
	} as Seguro)
	const [clientes, setClientes] = useState<Cliente[]>([])
	const [erros, setErros] = useState<Record<string, string>>({})

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token
	const { id } = useParams<{ id: string }>()

	// ── Busca a lista de clientes ──────────────────────────────────────────────
	async function buscarClientes() {
		try {
			await listar("/clientes", setClientes, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			} else {
				ToastAlerta("Erro ao carregar clientes!", "erro")
			}
		}
	}

	// ── Busca seguro pelo id (edição) ─────────────────────────────────────────
	async function buscarPorId(id: string) {
		try {
			await listar(`/seguros/${id}`, setSeguro, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			} else {
				ToastAlerta("Seguro não Encontrado!", "erro")
				retornar()
			}
		}
	}

	// ── Guarda usuário do contexto no seguro ──────────────────────────────────
	useEffect(() => {
		if (usuario.id) {
			setSeguro((prev) => ({ ...prev, usuario: usuario as any }))
		}
	}, [usuario])

	useEffect(() => {
		if (token === "") {
			if (!isLogout) ToastAlerta("Você precisa estar logado!", "info")
			navigate("/")
			return
		}
		buscarClientes()
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
			setIsEditing(true)
		}
	}, [id])

	// ── Atualiza campos simples ───────────────────────────────────────────────
	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target
		setSeguro((prev) => ({ ...prev, [name]: value }))
		const erro = validarCampoSeguro(name, value)
		setErros((prev) => ({ ...prev, [name]: erro }))
	}

	// ── Atualiza cliente via select ───────────────────────────────────────────
	function atualizarCliente(e: ChangeEvent<HTMLSelectElement>) {
		const clienteSelecionado = clientes.find((c) => c.id === Number(e.target.value))
		setSeguro((prev) => ({ ...prev, cliente: clienteSelecionado as Cliente }))
		const erro = validarCampoSeguro("cliente", e.target.value)
		setErros((prev) => ({ ...prev, cliente: erro }))
	}

	// ── Submissão ─────────────────────────────────────────────────────────────
	async function gerarNovoSeguro(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const errosValidacao = validarFormularioSeguro(seguro)
		setErros(errosValidacao)

		if (!formularioValido(errosValidacao)) {
			ToastAlerta("Por favor, corrija os erros no formulário", "erro")
			return
		}

		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/seguros`, seguro, setSeguro, { headers: { Authorization: token } })
				ToastAlerta("Seguro atualizado com sucesso", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) handleLogout()
				else ToastAlerta("Erro ao atualizar o Seguro!", "erro")
			}
		} else {
			try {
				await cadastrar(`/seguros`, seguro, setSeguro, { headers: { Authorization: token } })
				ToastAlerta("Seguro cadastrado com sucesso", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) handleLogout()
				else ToastAlerta("Erro ao cadastrar o Seguro!", "erro")
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate("/apolices")
	}

	// ── Helpers de estilo ─────────────────────────────────────────────────────
	function inputClass(campo: string) {
		return `border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
			erros[campo]
				? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
				: "border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
		}`
	}

	const readonlyClass =
		"border-2 border-gray-200 bg-gray-50 text-gray-400 rounded-lg px-4 py-2.5 text-sm cursor-not-allowed w-full"

	// ── Configuração BRL para NumericFormat ───────────────────────────────────
	const brlProps = {
		thousandSeparator: ".",
		decimalSeparator: ",",
		prefix: "R$ ",
		decimalScale: 2,
		fixedDecimalScale: true,
		allowNegative: false,
	}

	return (
		<div className="container flex flex-col mx-auto items-center">
			{/* Header */}
			<h1 className="text-4xl text-center my-8">
				{isEditing ? "Editar Seguro" : "Cadastrar Seguro"}
			</h1>

			{/* Form Container */}
			<div className="flex flex-col w-full max-w-2xl gap-4 mb-8">
				<form
					className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
					onSubmit={gerarNovoSeguro}
				>
					{/* ── Dados do Veículo ────────────────────────────────── */}
					<h2 className="text-base font-bold text-zinc-700 mb-4 pb-1 border-b border-gray-200">
						Dados do Veículo
					</h2>

					{/* Fabricante */}
					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="fabricante" className="text-sm font-semibold text-gray-700">
							Fabricante
						</label>
						<input
							type="text"
							placeholder="Ex: Toyota, Volkswagen..."
							id="fabricante"
							name="fabricante"
							required
							value={seguro.fabricante || ""}
							onChange={atualizarEstado}
							className={inputClass("fabricante")}
						/>
						{erros.fabricante && <span className="text-red-500 text-xs">{erros.fabricante}</span>}
					</div>

					{/* Modelo */}
					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="modelo" className="text-sm font-semibold text-gray-700">
							Modelo
						</label>
						<input
							type="text"
							placeholder="Ex: Corolla, Gol..."
							id="modelo"
							name="modelo"
							required
							value={seguro.modelo || ""}
							onChange={atualizarEstado}
							className={inputClass("modelo")}
						/>
						{erros.modelo && <span className="text-red-500 text-xs">{erros.modelo}</span>}
					</div>

					{/* Ano Fabricação + Ano Modelo */}
					<div className="grid grid-cols-2 gap-4 mb-5">
						<div className="flex flex-col gap-2">
							<label htmlFor="anoFabricacao" className="text-sm font-semibold text-gray-700">
								Ano de Fabricação
							</label>
							<NumericFormat
								id="anoFabricacao"
								name="anoFabricacao"
								placeholder="Ex: 2022"
								decimalScale={0}
								allowNegative={false}
								allowLeadingZeros={false}
								maxLength={4}
								value={seguro.anoFabricacao || ""}
								onValueChange={({ floatValue }) => {
									setSeguro((prev) => ({ ...prev, anoFabricacao: floatValue ?? 0 }))
									const erro = validarCampoSeguro("anoFabricacao", String(floatValue ?? ""))
									setErros((prev) => ({ ...prev, anoFabricacao: erro }))
								}}
								className={`${inputClass("anoFabricacao")} w-full`}
							/>
							{erros.anoFabricacao && (
								<span className="text-red-500 text-xs">{erros.anoFabricacao}</span>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="anoModelo" className="text-sm font-semibold text-gray-700">
								Ano do Modelo
							</label>
							<NumericFormat
								id="anoModelo"
								name="anoModelo"
								placeholder="Ex: 2023"
								decimalScale={0}
								allowNegative={false}
								allowLeadingZeros={false}
								maxLength={4}
								value={seguro.anoModelo || ""}
								onValueChange={({ floatValue }) => {
									setSeguro((prev) => ({ ...prev, anoModelo: floatValue ?? 0 }))
									const erro = validarCampoSeguro("anoModelo", String(floatValue ?? ""))
									setErros((prev) => ({ ...prev, anoModelo: erro }))
								}}
								className={`${inputClass("anoModelo")} w-full`}
							/>
							{erros.anoModelo && (
								<span className="text-red-500 text-xs">{erros.anoModelo}</span>
							)}
						</div>
					</div>

					{/* Placa */}
					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="placa" className="text-sm font-semibold text-gray-700">
							Placa
						</label>
						<input
							type="text"
							id="placa"
							name="placa"
							placeholder="Ex: ABC-1234 ou ABC1D23"
							required
							value={seguro.placa || ""}
							onChange={(e) => {
									e.target.value = e.target.value.toUpperCase()
									atualizarEstado(e)
								}}
							className={inputClass("placa")}
						/>
						{erros.placa && <span className="text-red-500 text-xs">{erros.placa}</span>}
					</div>

					{/* ── Valores ─────────────────────────────────────────── */}
					<h2 className="text-base font-bold text-zinc-700 mb-4 pb-1 border-b border-gray-200 mt-6">
						Valores
					</h2>

					{/* Valor Base (editável) */}
					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="valorBase" className="text-sm font-semibold text-gray-700">
							Valor Base
						</label>
						<NumericFormat
							{...brlProps}
							id="valorBase"
							name="valorBase"
							placeholder="R$ 0,00"
							required
							value={seguro.valorBase ?? ""}
							onValueChange={({ floatValue }) => {
								setSeguro((prev) => ({ ...prev, valorBase: floatValue ?? 0 }))
								const erro = validarCampoSeguro("valorBase", String(floatValue ?? ""))
								setErros((prev) => ({ ...prev, valorBase: erro }))
							}}
							className={`${inputClass("valorBase")} w-full`}
						/>
						{erros.valorBase && <span className="text-red-500 text-xs">{erros.valorBase}</span>}
					</div>

					{/* Valor Desconto + Valor Final (calculados pelo backend — exibidos apenas na edição) */}
					{isEditing && (
						<div className="grid grid-cols-2 gap-4 mb-5">
							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-gray-400">
									Valor Desconto{" "}
									<span className="text-xs font-normal">(calculado)</span>
								</label>
								<NumericFormat
									{...brlProps}
									value={seguro.valorDesconto ?? ""}
									readOnly
									tabIndex={-1}
									className={readonlyClass}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-gray-400">
									Valor Final{" "}
									<span className="text-xs font-normal">(calculado)</span>
								</label>
								<NumericFormat
									{...brlProps}
									value={seguro.valorFinal ?? ""}
									readOnly
									tabIndex={-1}
									className={readonlyClass}
								/>
							</div>
						</div>
					)}

					{/* ── Vigência ─────────────────────────────────────────── */}
					<h2 className="text-base font-bold text-zinc-700 mb-4 pb-1 border-b border-gray-200 mt-6">
						Vigência
					</h2>

					<div className="grid grid-cols-2 gap-4 mb-5">
						<div className="flex flex-col gap-2">
							<label htmlFor="dataInicio" className="text-sm font-semibold text-gray-700">
								Data de Início
							</label>
							<input
								type="date"
								id="dataInicio"
								name="dataInicio"
								required
								value={
									seguro.dataInicio
										? new Date(seguro.dataInicio).toISOString().split("T")[0]
										: ""
								}
								onChange={atualizarEstado}
								className={inputClass("dataInicio")}
							/>
							{erros.dataInicio && (
								<span className="text-red-500 text-xs">{erros.dataInicio}</span>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="dataFim" className="text-sm font-semibold text-gray-700">
								Data de Fim
							</label>
							<input
								type="date"
								id="dataFim"
								name="dataFim"
								required
								value={
									seguro.dataFim
										? new Date(seguro.dataFim).toISOString().split("T")[0]
										: ""
								}
								onChange={atualizarEstado}
								className={inputClass("dataFim")}
							/>
							{erros.dataFim && (
								<span className="text-red-500 text-xs">{erros.dataFim}</span>
							)}
						</div>
					</div>

					{/* ── Cliente ──────────────────────────────────────────── */}
					<h2 className="text-base font-bold text-zinc-700 mb-4 pb-1 border-b border-gray-200 mt-6">
						Cliente
					</h2>

					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="cliente" className="text-sm font-semibold text-gray-700">
							Selecione o Cliente
						</label>
						<select
							id="cliente"
							name="cliente"
							required
							value={seguro.cliente?.id ?? ""}
							onChange={atualizarCliente}
							className={`${inputClass("cliente")} text-slate-900`}
						>
							<option value="" disabled>
								— Escolha um cliente —
							</option>
							{clientes.map((c) => (
								<option key={c.id} value={c.id}>
									{c.nome}
								</option>
							))}
						</select>
						{erros.cliente && <span className="text-red-500 text-xs">{erros.cliente}</span>}
					</div>

					{/* Botão Submit */}
					<div className="flex justify-center pt-3">
						<button
							type="submit"
							disabled={isLoading}
							className="flex justify-center items-center rounded disabled:bg-gray-300 bg-linear-to-r 
								from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-bold 
								w-1/2 mx-auto py-2.5 transition-all duration-200 active:scale-95"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={20} />
							) : (
								<span>{isEditing ? "Atualizar" : "Cadastrar"}</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormSeguro