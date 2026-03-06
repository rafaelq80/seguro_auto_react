// Modelo de Dados do Gráfico de Pizza (Vigência dos Seguros)
export interface VigenciaData {
	name: 'Ativo' | 'Vencido' | 'A Vencer' | 'Aguardando'
	value: number
}

// Modelo de Dados do Gráfico de Barras — Faturamento por Fabricante
export interface FabricanteAgrupadoData {
	name: string  // nome do fabricante
	valor: number // soma do valorFinal
	count: number // quantidade de seguros
}

// Modelo de Dados do Gráfico de Barras — Ranking de Vendas por Usuário
export interface VendedorData {
	name: string  // nome do usuário
	value: number // soma do valorFinal
}