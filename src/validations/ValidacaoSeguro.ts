import type Seguro from '../models/Seguro'

/**
 * Valida um campo individual do formulário de seguro
 * @param name - Nome do campo a ser validado
 * @param value - Valor do campo
 * @returns String com mensagem de erro ou string vazia se válido
 */
export function validarCampoSeguro(name: string, value: string): string {
	switch (name) {
		case "fabricante":
			if (!value.trim()) return "Fabricante é obrigatório"
			if (value.trim().length > 255) return "Fabricante não pode exceder 255 caracteres"
			return ""

		case "modelo":
			if (!value.trim()) return "Modelo é obrigatório"
			if (value.trim().length > 255) return "Modelo não pode exceder 255 caracteres"
			return ""

		case "anoFabricacao": {
			if (value === "" || value === undefined) return "" // opcional
			const ano = Number(value)
			if (!Number.isInteger(ano)) return "Ano de fabricação deve ser um número inteiro"
			if (ano < 0) return "Ano de fabricação não pode ser negativo"
			return ""
		}

		case "anoModelo": {
			if (value === "" || value === undefined) return "" // opcional
			const ano = Number(value)
			if (!Number.isInteger(ano)) return "Ano do modelo deve ser um número inteiro"
			if (ano < 0) return "Ano do modelo não pode ser negativo"
			return ""
		}

		case "placa":
			if (!value.trim()) return "Placa é obrigatória"
			if (value.trim().length > 255) return "Placa não pode exceder 255 caracteres"
			return ""

		case "valorBase": {
			if (value === "" || value === undefined) return "Valor base é obrigatório"
			const valor = Number(value)
			if (isNaN(valor)) return "Valor base inválido"
			if (valor <= 0) return "Valor base deve ser maior que zero"
			if (!/^\d+(\.\d{1,2})?$/.test(String(valor))) return "Valor base deve ter no máximo 2 casas decimais"
			return ""
		}

		case "dataInicio":
			if (!value) return "Data de início é obrigatória"
			if (isNaN(Date.parse(value))) return "Data de início inválida"
			return ""

		case "dataFim":
			if (!value) return "Data de fim é obrigatória"
			if (isNaN(Date.parse(value))) return "Data de fim inválida"
			return ""

		case "cliente":
			if (!value) return "Cliente é obrigatório"
			return ""

		default:
			return ""
	}
}

/**
 * Valida todo o formulário de seguro
 * @param seguro - Objeto seguro com os dados do formulário
 * @returns Objeto com erros por campo (vazio se não houver erros)
 */
export function validarFormularioSeguro(seguro: Seguro): Record<string, string> {
	const erros: Record<string, string> = {}

	erros.fabricante   = validarCampoSeguro("fabricante",    seguro.fabricante             || "")
	erros.modelo       = validarCampoSeguro("modelo",        seguro.modelo                 || "")
	erros.anoFabricacao = validarCampoSeguro("anoFabricacao", String(seguro.anoFabricacao  ?? ""))
	erros.anoModelo    = validarCampoSeguro("anoModelo",     String(seguro.anoModelo       ?? ""))
	erros.placa        = validarCampoSeguro("placa",         seguro.placa                  || "")
	erros.valorBase    = validarCampoSeguro("valorBase",     String(seguro.valorBase       ?? ""))
	erros.dataInicio   = validarCampoSeguro("dataInicio",    seguro.dataInicio ? String(seguro.dataInicio) : "")
	erros.dataFim      = validarCampoSeguro("dataFim",       seguro.dataFim    ? String(seguro.dataFim)    : "")
	erros.cliente      = validarCampoSeguro("cliente",       String(seguro.cliente?.id     ?? ""))

	// Validação cruzada: dataFim deve ser posterior à dataInicio
	if (!erros.dataInicio && !erros.dataFim && seguro.dataInicio && seguro.dataFim) {
		if (new Date(seguro.dataFim) <= new Date(seguro.dataInicio)) {
			erros.dataFim = "Data de fim deve ser posterior à data de início"
		}
	}

	// Remove campos sem erro
	Object.keys(erros).forEach((key) => {
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