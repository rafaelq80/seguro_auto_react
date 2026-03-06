import type Cliente from "./Cliente"
import type Usuario from "./Usuario"

export default interface Seguro{
	id: number
	fabricante: string
	modelo: string
	anoFabricacao: number
	anoModelo: number
	placa: string
	valorBase: number
	valorDesconto: number
	valorFinal: number
	dataInicio: Date
	dataFim: Date
	cliente: Cliente
	usuario: Usuario
}