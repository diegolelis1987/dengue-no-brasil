
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, FileText, Printer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  imagesAnalyzed: number;
  riskDetections: number;
  status: 'Concluído' | 'Em Progresso';
}

const ReportsPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock report data
  const reports: Report[] = [
    {
      id: 'rep-001',
      title: 'Análise Mensal - Zona Sul',
      date: '2023-04-01',
      type: 'Mensal',
      imagesAnalyzed: 120,
      riskDetections: 14,
      status: 'Concluído'
    },
    {
      id: 'rep-002',
      title: 'Análise Semanal - Zona Leste',
      date: '2023-04-12',
      type: 'Semanal',
      imagesAnalyzed: 45,
      riskDetections: 7,
      status: 'Concluído'
    },
    {
      id: 'rep-003',
      title: 'Análise Diária - Região Central',
      date: '2023-04-15',
      type: 'Diário',
      imagesAnalyzed: 18,
      riskDetections: 2,
      status: 'Concluído'
    },
    {
      id: 'rep-004',
      title: 'Análise Semanal - Zona Norte',
      date: '2023-04-19',
      type: 'Semanal',
      imagesAnalyzed: 32,
      riskDetections: 5,
      status: 'Em Progresso'
    },
    {
      id: 'rep-005',
      title: 'Análise Especial - Bairros Prioritários',
      date: '2023-04-20',
      type: 'Especial',
      imagesAnalyzed: 60,
      riskDetections: 9,
      status: 'Em Progresso'
    }
  ];
  
  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.type.toLowerCase() === filter || report.status.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Relatórios de Análise</CardTitle>
              <CardDescription>
                Visualize, exporte e gerencie relatórios de análise de imagens de drone.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filtrar relatórios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os relatórios</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="diário">Diário</SelectItem>
                  <SelectItem value="especial">Especial</SelectItem>
                  <SelectItem value="concluído">Concluídos</SelectItem>
                  <SelectItem value="em progresso">Em Progresso</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-dengue-primary hover:bg-dengue-dark">
                <FileText className="mr-2 h-4 w-4" />
                Novo Relatório
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Título</th>
                  <th className="text-left py-3 px-4">Data</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-center py-3 px-4">Imagens Analisadas</th>
                  <th className="text-center py-3 px-4">Riscos Detectados</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{report.title}</td>
                    <td className="py-3 px-4">
                      {new Date(report.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">{report.type}</td>
                    <td className="py-3 px-4 text-center">{report.imagesAnalyzed}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                        report.riskDetections > 10 
                          ? 'bg-dengue-warning/10 text-dengue-warning'
                          : report.riskDetections > 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {report.riskDetections}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                        report.status === 'Concluído' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Visualizar</span>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Download</span>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Imprimir</span>
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      Nenhum relatório encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Exibindo {filteredReports.length} de {reports.length} relatórios.
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerar Novo Relatório</CardTitle>
            <CardDescription>
              Crie um novo relatório baseado em análises existentes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo de Relatório
                </label>
                <Select defaultValue="summary">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Resumo</SelectItem>
                    <SelectItem value="detailed">Detalhado</SelectItem>
                    <SelectItem value="analytical">Analítico</SelectItem>
                    <SelectItem value="comparative">Comparativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Período
                </label>
                <Select defaultValue="last7days">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                    <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                    <SelectItem value="lastquarter">Último trimestre</SelectItem>
                    <SelectItem value="custom">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Regiões a incluir
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as regiões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as regiões</SelectItem>
                  <SelectItem value="north">Zona Norte</SelectItem>
                  <SelectItem value="south">Zona Sul</SelectItem>
                  <SelectItem value="east">Zona Leste</SelectItem>
                  <SelectItem value="west">Zona Oeste</SelectItem>
                  <SelectItem value="center">Região Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Dados a incluir
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded text-dengue-primary" />
                  <span>Imagens</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded text-dengue-primary" />
                  <span>Mapa</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded text-dengue-primary" />
                  <span>Estatísticas</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded text-dengue-primary" />
                  <span>Recomendações</span>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-dengue-primary hover:bg-dengue-dark">
              Gerar Relatório
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Relatórios</CardTitle>
            <CardDescription>
              Resumo dos relatórios e análises realizadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Total de Relatórios</div>
                  <div className="text-2xl font-bold">{reports.length}</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Imagens Analisadas</div>
                  <div className="text-2xl font-bold">
                    {reports.reduce((acc, r) => acc + r.imagesAnalyzed, 0)}
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Riscos Detectados</div>
                  <div className="text-2xl font-bold text-dengue-warning">
                    {reports.reduce((acc, r) => acc + r.riskDetections, 0)}
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Taxa de Detecção</div>
                  <div className="text-2xl font-bold">
                    {Math.round((reports.reduce((acc, r) => acc + r.riskDetections, 0) / 
                      reports.reduce((acc, r) => acc + r.imagesAnalyzed, 0)) * 100)}%
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Distribuição por Tipo</h4>
                <div className="h-10 bg-gray-100 rounded-full overflow-hidden flex">
                  {(() => {
                    const types = reports.reduce((acc, r) => {
                      acc[r.type] = (acc[r.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    
                    const total = reports.length;
                    const colors = {
                      'Diário': 'bg-blue-500',
                      'Semanal': 'bg-green-500',
                      'Mensal': 'bg-purple-500',
                      'Especial': 'bg-orange-500'
                    } as Record<string, string>;
                    
                    return Object.entries(types).map(([type, count], i) => (
                      <div 
                        key={type}
                        className={`h-full ${colors[type] || 'bg-gray-400'}`}
                        style={{ width: `${(count / total) * 100}%` }}
                        title={`${type}: ${count} (${Math.round((count / total) * 100)}%)`}
                      />
                    ));
                  })()}
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 mt-2">
                  {(() => {
                    const types = reports.reduce((acc, r) => {
                      acc[r.type] = (acc[r.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    
                    const colors = {
                      'Diário': 'bg-blue-500',
                      'Semanal': 'bg-green-500',
                      'Mensal': 'bg-purple-500',
                      'Especial': 'bg-orange-500'
                    } as Record<string, string>;
                    
                    return Object.entries(types).map(([type, count]) => (
                      <div key={type} className="flex items-center text-xs">
                        <div className={`h-2 w-2 rounded-full ${colors[type] || 'bg-gray-400'} mr-1`}></div>
                        <span>{type}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
