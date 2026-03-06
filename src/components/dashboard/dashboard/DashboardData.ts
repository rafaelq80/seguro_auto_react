import type Seguro from '../../../models/Seguro'
import type { VigenciaData, VendedorData, FabricanteAgrupadoData } from './DashboardModel'

/**
 * Agrupa seguros por status de vigência:
 * - Ativo: dataInicio <= hoje e dataFim > hoje+30
 * - A Vencer: dataFim entre hoje e hoje+30
 * - Vencido: dataFim < hoje
 * - Aguardando: dataInicio > hoje
 */
export function agruparSegurosPorVigencia(seguros: Seguro[]): VigenciaData[] {
	const hoje = new Date()
	const em30Dias = new Date()
	em30Dias.setDate(hoje.getDate() + 30)

	const contadores: Record<VigenciaData['name'], number> = {
		Ativo: 0,
		Vencido: 0,
		'A Vencer': 0,
		Aguardando: 0,
	}

	seguros.forEach(({ dataInicio, dataFim }) => {
		const inicio = new Date(dataInicio)
		const fim = new Date(dataFim)

		if (inicio > hoje) {
			contadores['Aguardando']++
		} else if (fim < hoje) {
			contadores['Vencido']++
		} else if (fim <= em30Dias) {
			contadores['A Vencer']++
		} else {
			contadores['Ativo']++
		}
	})

	return (Object.entries(contadores) as [VigenciaData['name'], number][])
		.filter(([, value]) => value > 0)
		.map(([name, value]) => ({ name, value }))
}

/**
 * Ranking de faturamento (valorFinal) por usuário responsável
 */
export function agruparVendasPorUsuario(seguros: Seguro[]): VendedorData[] {
	const mapa = new Map<string, number>()

	seguros.forEach(({ usuario, valorFinal }) => {
		if (!usuario) return
		const nome = usuario.nome ?? usuario.usuario ?? `Usuário #${usuario.id}`
		mapa.set(nome, (mapa.get(nome) ?? 0) + Number(valorFinal))
	})

	return Array.from(mapa.entries())
		.map(([name, value]): VendedorData => ({ name, value }))
		.sort((a, b) => b.value - a.value)
}

/**
 * Faturamento total (valorFinal) agrupado por fabricante
 */
export function agruparFaturamentoPorFabricante(seguros: Seguro[]): FabricanteAgrupadoData[] {
	const mapa = new Map<string, { valor: number; count: number }>()

	seguros.forEach(({ fabricante, valorFinal }) => {
		const fab = fabricante ?? 'Sem fabricante'
		const atual = mapa.get(fab) ?? { valor: 0, count: 0 }
		mapa.set(fab, { valor: atual.valor + Number(valorFinal), count: atual.count + 1 })
	})

	return Array.from(mapa.entries())
		.map(([name, { valor, count }]): FabricanteAgrupadoData => ({ name, valor, count }))
		.sort((a, b) => b.valor - a.valor)
}