
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock alert data
const mockAlerts = [
  {
    id: 'a001',
    title: 'Múltiplos focos de dengue detectados',
    location: 'Vila Mariana, São Paulo',
    coordinates: { lat: -23.586, lng: -46.632 },
    date: '2023-04-25T10:30:00',
    riskLevel: 'Alto',
    description: 'Análise de drone identificou 5 possíveis focos de dengue em uma área residencial, incluindo caixas d\'água abertas e recipientes com água acumulada.',
    images: 3,
    status: 'Não resolvido'
  },
  {
    id: 'a002',
    title: 'Calhas entupidas detectadas',
    location: 'Copacabana, Rio de Janeiro',
    coordinates: { lat: -22.971, lng: -43.182 },
    date: '2023-04-24T15:45:00',
    riskLevel: 'Médio',
    description: 'Drone identificou calhas entupidas em 3 edifícios próximos com acúmulo de água.',
    images: 2,
    status: 'Em análise'
  },
  {
    id: 'a003',
    title: 'Depósitos de água desprotegidos',
    location: 'Boa Viagem, Recife',
    coordinates: { lat: -8.131, lng: -34.904 },
    date: '2023-04-23T09:15:00',
    riskLevel: 'Alto',
    description: 'Vários recipientes de água sem tampa adequada identificados em área comercial.',
    images: 4,
    status: 'Não resolvido'
  },
  {
    id: 'a004',
    title: 'Piscinas abandonadas detectadas',
    location: 'Centro, Manaus',
    coordinates: { lat: -3.117, lng: -60.025 },
    date: '2023-04-22T11:00:00',
    riskLevel: 'Médio',
    description: 'Duas piscinas sem manutenção identificadas com água parada em propriedade aparentemente abandonada.',
    images: 2,
    status: 'Resolvido'
  },
  {
    id: 'a005',
    title: 'Acúmulo de água em terreno',
    location: 'Asa Sul, Brasília',
    coordinates: { lat: -15.812, lng: -47.912 },
    date: '2023-04-21T14:20:00',
    riskLevel: 'Baixo',
    description: 'Pequeno acúmulo de água detectado em terreno aberto após chuvas recentes.',
    images: 1,
    status: 'Resolvido'
  }
];

const AlertsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<typeof mockAlerts[0] | null>(null);

  // Filter alerts based on search and filters
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === null || alert.status === statusFilter;
    const matchesRisk = riskFilter === null || alert.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alertas de Focos</h1>
          <p className="text-muted-foreground">
            Alertas gerados a partir da detecção de possíveis focos de dengue.
          </p>
        </div>
        
        <Button className="bg-dengue-primary hover:bg-dengue-dark">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Gerar Relatório de Alertas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts list column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtrar Alertas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por título, localização ou descrição..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div>
                  <span className="text-sm font-medium mr-2">Status:</span>
                  <Badge 
                    variant={statusFilter === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter(null)}
                  >
                    Todos
                  </Badge>
                  <Badge 
                    variant={statusFilter === "Não resolvido" ? "default" : "outline"}
                    className="cursor-pointer ml-1"
                    onClick={() => setStatusFilter("Não resolvido")}
                  >
                    Não resolvido
                  </Badge>
                  <Badge 
                    variant={statusFilter === "Em análise" ? "default" : "outline"}
                    className="cursor-pointer ml-1"
                    onClick={() => setStatusFilter("Em análise")}
                  >
                    Em análise
                  </Badge>
                  <Badge 
                    variant={statusFilter === "Resolvido" ? "default" : "outline"}
                    className="cursor-pointer ml-1"
                    onClick={() => setStatusFilter("Resolvido")}
                  >
                    Resolvido
                  </Badge>
                </div>
                
                <div>
                  <span className="text-sm font-medium mr-2">Risco:</span>
                  <Badge 
                    variant={riskFilter === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setRiskFilter(null)}
                  >
                    Todos
                  </Badge>
                  <Badge 
                    variant={riskFilter === "Alto" ? "default" : "outline"}
                    className="cursor-pointer ml-1 bg-dengue-warning text-white"
                    onClick={() => setRiskFilter("Alto")}
                  >
                    Alto
                  </Badge>
                  <Badge 
                    variant={riskFilter === "Médio" ? "default" : "outline"}
                    className="cursor-pointer ml-1 bg-dengue-yellow text-black"
                    onClick={() => setRiskFilter("Médio")}
                  >
                    Médio
                  </Badge>
                  <Badge 
                    variant={riskFilter === "Baixo" ? "default" : "outline"}
                    className="cursor-pointer ml-1 bg-dengue-primary text-white"
                    onClick={() => setRiskFilter("Baixo")}
                  >
                    Baixo
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Alerts list */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Alertas ({filteredAlerts.length})</CardTitle>
              <CardDescription>
                Selecione um alerta para ver detalhes completos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map(alert => (
                    <div 
                      key={alert.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedAlert?.id === alert.id 
                          ? 'bg-muted border-dengue-primary' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            alert.riskLevel === 'Alto' 
                              ? 'bg-dengue-warning/10 text-dengue-warning' 
                              : alert.riskLevel === 'Médio'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{alert.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alert.location}
                            </div>
                            <div className="mt-1">
                              <Badge variant="outline" className={`text-xs ${
                                alert.status === 'Não resolvido' 
                                  ? 'border-dengue-warning text-dengue-warning' 
                                  : alert.status === 'Em análise'
                                  ? 'border-blue-500 text-blue-500'
                                  : 'border-green-500 text-green-500'
                              }`}>
                                {alert.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(alert.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Nenhum alerta encontrado com os filtros aplicados.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredAlerts.length} de {mockAlerts.length} alertas.
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Alert details column */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Detalhes do Alerta</CardTitle>
              <CardDescription>
                Informações detalhadas sobre o alerta selecionado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg ${
                    selectedAlert.riskLevel === 'Alto' 
                      ? 'bg-dengue-warning/10 border border-dengue-warning/30' 
                      : selectedAlert.riskLevel === 'Médio'
                      ? 'bg-yellow-100 border border-yellow-300'
                      : 'bg-green-100 border border-green-300'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`h-5 w-5 ${
                        selectedAlert.riskLevel === 'Alto' 
                          ? 'text-dengue-warning' 
                          : selectedAlert.riskLevel === 'Médio'
                          ? 'text-yellow-800'
                          : 'text-green-800'
                      }`} />
                      <div>
                        <p className="font-medium">Nível de Risco: {selectedAlert.riskLevel}</p>
                        <p className="text-sm">{selectedAlert.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">{selectedAlert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Criado em {new Date(selectedAlert.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Localização</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedAlert.location}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Coordenadas: {selectedAlert.coordinates.lat.toFixed(6)}, {selectedAlert.coordinates.lng.toFixed(6)}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Descrição</h4>
                    <p className="text-sm">{selectedAlert.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Imagens</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Array(selectedAlert.images).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-gray-400"
                        >
                          <span className="text-xs">Imagem {i+1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedAlert.images} {selectedAlert.images === 1 ? 'imagem detectada' : 'imagens detectadas'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mb-4 opacity-20" />
                  <h4 className="font-medium mb-1">Nenhum alerta selecionado</h4>
                  <p className="text-sm">
                    Selecione um alerta da lista para ver os detalhes completos.
                  </p>
                </div>
              )}
            </CardContent>
            {selectedAlert && (
              <CardFooter className="border-t pt-4 flex flex-col space-y-2">
                <Button className="w-full" variant="outline">
                  Ver no Mapa
                </Button>
                <Button className="w-full bg-dengue-primary hover:bg-dengue-dark">
                  Ações Recomendadas
                </Button>
                {selectedAlert.status !== "Resolvido" && (
                  <Button className="w-full" variant="outline">
                    Marcar como Resolvido
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
