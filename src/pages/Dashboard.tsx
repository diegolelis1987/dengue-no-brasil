import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  FileText,
  Map,
  MapPinned,
  ShieldAlert,
  Stethoscope,
  TrendingDown,
  UsersRound,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sourceUrl = 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/arboviroses/informe-semanal/2025/informe-semanal-no-17.pdf';

const regionData = [
  { region: 'Norte', cases: 34166, incidence: 196.9, color: '#38bdf8' },
  { region: 'Nordeste', cases: 61164, incidence: 111.9, color: '#2dd4bf' },
  { region: 'Sudeste', cases: 1027932, incidence: 1211.5, color: '#f97316' },
  { region: 'Sul', cases: 227062, incidence: 758.6, color: '#8b5cf6' },
  { region: 'Centro-Oeste', cases: 128428, incidence: 788.5, color: '#ec4899' },
];

const priorityStates = [
  { state: 'São Paulo', abbreviation: 'SP', cases: 818900, incidence: 1843.5 },
  { state: 'Goiás', abbreviation: 'GO', cases: 76826, incidence: 1088.9 },
  { state: 'Acre', abbreviation: 'AC', cases: 8563, incidence: 1031.7 },
  { state: 'Paraná', abbreviation: 'PR', cases: 115297, incidence: 1007.6 },
  { state: 'Mato Grosso', abbreviation: 'MT', cases: 30146, incidence: 823.9 },
];

const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR').format(value);
const formatIncidence = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const MetricCard = ({
  label,
  value,
  supportingText,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  supportingText: string;
  icon: typeof BarChart3;
  accent: string;
}) => (
  <Card className="border-slate-200 bg-white shadow-sm">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{supportingText}</p>
    </CardContent>
  </Card>
);

const DashboardHome = () => {
  const [selectedRegion, setSelectedRegion] = useState('Sudeste');
  const activeRegion = useMemo(
    () => regionData.find((region) => region.region === selectedRegion) ?? regionData[0],
    [selectedRegion],
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:px-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-36 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-100">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1">INTELIGÊNCIA EPIDEMIOLÓGICA</span>
              <span className="text-slate-300">Brasil · SE 01–23/2025</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Decisões mais rápidas para uma resposta coordenada.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Visão comercial do cenário nacional, com indicadores oficiais para orientar a priorização territorial e o acompanhamento das operações.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">−75,7% de casos prováveis</p>
              <p className="text-xs text-slate-400">versus o mesmo período de 2024</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">Panorama nacional</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Monitoramento de dengue</h1>
          <p className="mt-1 text-sm text-slate-500">Dados consolidados no Informe Semanal nº 17, publicado em 17 jun. 2025.</p>
        </div>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-800 lg:self-auto"
        >
          <FileText className="h-4 w-4" />
          Abrir fonte oficial
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Casos prováveis"
          value="1.478.752"
          supportingText="SE 01–23/2025 · incidência nacional de 728,2 por 100 mil habitantes."
          icon={BarChart3}
          accent="bg-cyan-50 text-cyan-700"
        />
        <MetricCard
          label="Óbitos confirmados"
          value="1.165"
          supportingText="Óbitos por dengue confirmados no período monitorado."
          icon={AlertTriangle}
          accent="bg-rose-50 text-rose-700"
        />
        <MetricCard
          label="Óbitos em investigação"
          value="752"
          supportingText="Registros ainda sujeitos à conclusão da investigação epidemiológica."
          icon={ShieldAlert}
          accent="bg-amber-50 text-amber-700"
        />
        <MetricCard
          label="Casos graves e com alarme"
          value="27.218"
          supportingText="Dengue grave e dengue com sinais de alarme notificadas no período."
          icon={Stethoscope}
          accent="bg-violet-50 text-violet-700"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-lg text-slate-900">Incidência por região</CardTitle>
              <p className="mt-1 text-sm text-slate-500">Casos prováveis por 100 mil habitantes · SE 01–23/2025</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Região em foco</p>
              <p className="text-sm font-semibold text-slate-900">{activeRegion.region}</p>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[290px] w-full" aria-label="Gráfico de incidência de dengue por região">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 12, right: 6, left: -16, bottom: 4 }}>
                  <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                  <XAxis dataKey="region" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    formatter={(value: number) => [`${formatIncidence(value)} por 100 mil`, 'Incidência']}
                    labelFormatter={(label) => `Região ${label}`}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, .08)' }}
                  />
                  <Bar dataKey="incidence" radius={[7, 7, 2, 2]} onClick={(data) => setSelectedRegion(data.region)} className="cursor-pointer">
                    {regionData.map((entry) => (
                      <Cell key={entry.region} fill={entry.region === selectedRegion ? entry.color : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {regionData.map((region) => (
                <button
                  key={region.region}
                  type="button"
                  onClick={() => setSelectedRegion(region.region)}
                  className={`rounded-lg border px-3 py-2 text-left transition ${
                    selectedRegion === region.region
                      ? 'border-cyan-300 bg-cyan-50 ring-1 ring-cyan-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-xs text-slate-500">{region.region}</span>
                  <span className="mt-1 block text-sm font-semibold text-slate-900">{formatIncidence(region.incidence)}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900"><MapPinned className="h-5 w-5 text-cyan-700" /> Recorte regional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-300">{activeRegion.region}</p>
              <p className="mt-3 text-4xl font-semibold">{formatIncidence(activeRegion.incidence)}</p>
              <p className="mt-1 text-sm text-slate-300">casos prováveis por 100 mil habitantes</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs text-slate-400">Casos prováveis no período</p>
                <p className="mt-1 text-xl font-semibold">{formatNumber(activeRegion.cases)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {activeRegion.region === 'Sudeste'
                ? 'A região concentra a maior incidência e o maior número absoluto de casos entre as regiões brasileiras neste recorte.'
                : 'Selecione outra região no gráfico para comparar a incidência e o volume de casos do mesmo período.'}
            </p>
            <Button asChild variant="outline" className="mt-5 w-full border-slate-200 text-slate-700 hover:bg-slate-100">
              <Link to="/dashboard/map">Explorar no mapa <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-lg text-slate-900">UFs destacadas por incidência</CardTitle>
              <p className="mt-1 text-sm text-slate-500">Estados citados no informe entre as maiores incidências · SE 01–23/2025</p>
            </div>
            <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">UF</th>
                    <th className="px-6 py-3 font-medium">Casos prováveis</th>
                    <th className="px-6 py-3 font-medium">Incidência / 100 mil</th>
                    <th className="px-6 py-3 font-medium">Leitura</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {priorityStates.map((state, index) => (
                    <tr key={state.abbreviation} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</span><span className="font-medium text-slate-900">{state.state}</span> <span className="text-slate-400">{state.abbreviation}</span></td>
                      <td className="px-6 py-4 font-medium text-slate-700">{formatNumber(state.cases)}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{formatIncidence(state.incidence)}</td>
                      <td className="px-6 py-4"><span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">Monitorar prioridade</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-100 bg-cyan-50/40 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Próximas ações</CardTitle>
            <p className="mt-1 text-sm text-slate-600">Atalhos para converter o panorama em operação.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/dashboard/analysis" className="group flex items-center gap-3 rounded-xl border border-cyan-100 bg-white p-4 transition hover:border-cyan-300 hover:shadow-sm">
              <span className="rounded-lg bg-cyan-50 p-2 text-cyan-700"><Map className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-medium text-slate-900">Analisar imagens</span><span className="mt-0.5 block text-xs text-slate-500">Organize a triagem de evidências de campo.</span></span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700" />
            </Link>
            <Link to="/dashboard/alerts" className="group flex items-center gap-3 rounded-xl border border-cyan-100 bg-white p-4 transition hover:border-cyan-300 hover:shadow-sm">
              <span className="rounded-lg bg-amber-50 p-2 text-amber-700"><ShieldAlert className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-medium text-slate-900">Acompanhar alertas</span><span className="mt-0.5 block text-xs text-slate-500">Priorize itens que precisam de resposta.</span></span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700" />
            </Link>
            <Link to="/dashboard/reports" className="group flex items-center gap-3 rounded-xl border border-cyan-100 bg-white p-4 transition hover:border-cyan-300 hover:shadow-sm">
              <span className="rounded-lg bg-violet-50 p-2 text-violet-700"><FileText className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-medium text-slate-900">Gerar relatório</span><span className="mt-0.5 block text-xs text-slate-500">Compartilhe uma síntese com a operação.</span></span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <footer className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-xs leading-5 text-slate-500">
        <strong className="font-semibold text-slate-700">Fonte e período:</strong> Ministério da Saúde — Secretaria de Vigilância em Saúde e Ambiente (SVSA), Informe Semanal nº 17 — COE Dengue e outras Arboviroses, SE 01 a 23 de 2025 (29/12/2024 a 07/06/2025), publicado em 17/06/2025. Dados sujeitos a revisão pelos sistemas de vigilância.
      </footer>
    </div>
  );
};

export default DashboardHome;
