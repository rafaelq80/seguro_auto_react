import type Seguro from "./Seguro"

export default interface Cliente {
	id: number
	nome: string
	email: string
	foto: string
	seguro?: Seguro | null
}
