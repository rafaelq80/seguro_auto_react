import type Cliente from '../models/Cliente'

/**
 * Valida um campo individual do formulário de cliente
 * @param name - Nome do campo a ser validado
 * @param value - Valor do campo
 * @returns String com mensagem de erro ou string vazia se válido
 */
export function validarCampoCliente(name: string, value: string): string {
	switch (name) {
		case "nome":
			if (!value.trim()) return "Nome é obrigatório"
			if (value.length < 3) return "Nome deve ter pelo menos 3 caracteres"
			if (value.length > 100) return "Nome não pode exceder 100 caracteres"
			return ""

		case "email":
			if (!value.trim()) return "E-mail é obrigatório"
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(value)) return "E-mail inválido"
			return ""

		case "foto":
			if (!value.trim()) return "Logo é obrigatória"
			if (value.length > 255) return "URL da logo não pode exceder 255 caracteres"
			// Validação básica de URL
			try {
				new URL(value)
			} catch {
				return "URL inválida"
			}
			return ""

		default:
			return ""
	}
}

/**
 * Valida todo o formulário de cliente
 * @param cliente - Objeto cliente com os dados do formulário
 * @returns Objeto com erros por campo (vazio se não houver erros)
 */
export function validarFormularioCliente(cliente: Cliente): Record<string, string> {
	const erros: Record<string, string> = {}

	erros.nome = validarCampoCliente("nome", cliente.nome || "")
	erros.email = validarCampoCliente("email", cliente.email || "")
	erros.foto = validarCampoCliente("foto", cliente.foto || "")

	// Remove campos sem erro
	Object.keys(erros).forEach(key => {
		if (erros[key] === "") delete erros[key]
	})

	return erros
}

/**
 * Verifica se o formulário tem algum erro
 * @param erros - Objeto com os erros do formulário
 * @returns true se não houver erros, false caso contrário
 */
export function formularioValido(erros: Record<string, string>): boolean {
	return Object.keys(erros).length === 0
}