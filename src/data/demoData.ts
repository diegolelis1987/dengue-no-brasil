export type RiskLevel = 'Alto' | 'Médio' | 'Baixo';
export type RecordStatus = 'Novo' | 'Em análise' | 'Resolvido';

export interface DetectionRecord {
  id: string;
  neighborhood: string;
  city: string;
  uf: string;
  risk: RiskLevel;
  status: RecordStatus;
  category: string;
  date: string;
  x: number;
  y: number;
  evidence: string;
  confidence: number;
}

export const demoDisclosure = 'Amostra operacional demonstrativa — não representa vigilância oficial nem ocorrência confirmada.';

export const officialSource = {
  publisher: 'Ministério da Saúde — Secretaria de Vigilância em Saúde e Ambiente',
  title: 'Informe Semanal nº 17 — Monitoramento dos casos de arboviroses até a Semana Epidemiológica 23 de 2025',
  period: 'SE 01 a 23 de 2025 · publicado em 17 de junho de 2025',
  url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/arboviroses/informe-semanal/2025/informe-semanal-no-17.pdf',
  caveat: 'Indicadores nacionais são uma referência de publicação oficial e podem ser revisados pelo órgão publicador. Eles não são atualizações em tempo real do território exibido nesta demonstração.',
};

export const detectionRecords: DetectionRecord[] = [
  { id: 'det-001', neighborhood: 'Vila Mariana', city: 'São Paulo', uf: 'SP', risk: 'Alto', status: 'Novo', category: "Recipientes expostos", date: '18 jun 2025, 09:42', x: 67, y: 66, evidence: '3 recipientes com água acumulada', confidence: 94 },
  { id: 'det-002', neighborhood: 'Pinheiros', city: 'São Paulo', uf: 'SP', risk: 'Médio', status: 'Em análise', category: "Calhas", date: '17 jun 2025, 14:20', x: 64, y: 62, evidence: 'Calha obstruída em cobertura', confidence: 81 },
  { id: 'det-003', neighborhood: 'Boa Viagem', city: 'Recife', uf: 'PE', risk: 'Alto', status: 'Novo', category: "Caixa d’água", date: '18 jun 2025, 08:10', x: 77, y: 39, evidence: 'Reservatório sem vedação visível', confidence: 92 },
  { id: 'det-004', neighborhood: 'Copacabana', city: 'Rio de Janeiro', uf: 'RJ', risk: 'Médio', status: 'Em análise', category: "Piscina", date: '16 jun 2025, 11:36', x: 68, y: 72, evidence: 'Área de piscina sem manutenção', confidence: 76 },
  { id: 'det-005', neighborhood: 'Asa Sul', city: 'Brasília', uf: 'DF', risk: 'Baixo', status: 'Resolvido', category: "Terreno", date: '15 jun 2025, 16:05', x: 58, y: 50, evidence: 'Poça após chuva — vistoria concluída', confidence: 69 },
  { id: 'det-006', neighborhood: 'Centro', city: 'Manaus', uf: 'AM', risk: 'Médio', status: 'Novo', category: "Pneus", date: '17 jun 2025, 10:18', x: 39, y: 28, evidence: 'Pneus expostos no pátio', confidence: 84 },
  { id: 'det-007', neighborhood: 'Batista Campos', city: 'Belém', uf: 'PA', risk: 'Baixo', status: 'Resolvido', category: "Vasos", date: '14 jun 2025, 13:20', x: 47, y: 25, evidence: 'Pratos de plantas — ação orientativa', confidence: 71 },
  { id: 'det-008', neighborhood: 'Centro', city: 'Curitiba', uf: 'PR', risk: 'Médio', status: 'Em análise', category: "Calhas", date: '16 jun 2025, 15:54', x: 61, y: 82, evidence: 'Cobertura comercial com acúmulo', confidence: 79 },
];

export const riskStyle: Record<RiskLevel, { dot: string; bg: string; text: string; label: string }> = {
  Alto: { dot: '#C62828', bg: 'bg-red-50', text: 'text-red-800', label: 'Risco alto' },
  Médio: { dot: '#B7791F', bg: 'bg-amber-50', text: 'text-amber-900', label: 'Risco médio' },
  Baixo: { dot: '#2E8B57', bg: 'bg-emerald-50', text: 'text-emerald-800', label: 'Risco baixo' },
};

export const alertRecords = detectionRecords.filter((record) => record.risk !== 'Baixo').map((record) => ({
  ...record,
  title: record.risk === 'Alto' ? `Priorizar vistoria em ${record.neighborhood}` : `Avaliar evidência em ${record.neighborhood}`,
  description: `${record.evidence}. Registro de operação para validação da equipe de campo.`,
}));

export const cities = Array.from(new Set(detectionRecords.map((record) => record.city)));
export const neighborhoods = Array.from(new Set(detectionRecords.map((record) => record.neighborhood))).sort();
export const categories = Array.from(new Set(detectionRecords.map((record) => record.category))).sort();
