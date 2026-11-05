
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Info, MapPin } from 'lucide-react';

// Mock data for dengue focus points
const mockFocusPoints = [
  { id: 1, lat: -23.55, lng: -46.63, location: "Vila Mariana, São Paulo", riskLevel: "Alto", detections: 5 },
  { id: 2, lat: -22.91, lng: -43.20, location: "Copacabana, Rio de Janeiro", riskLevel: "Médio", detections: 3 },
  { id: 3, lat: -8.05, lng: -34.88, location: "Boa Viagem, Recife", riskLevel: "Alto", detections: 7 },
  { id: 4, lat: -3.10, lng: -60.02, location: "Centro, Manaus", riskLevel: "Médio", detections: 2 },
  { id: 5, lat: -15.79, lng: -47.88, location: "Asa Sul, Brasília", riskLevel: "Baixo", detections: 1 },
  { id: 6, lat: -30.03, lng: -51.20, location: "Centro Histórico, Porto Alegre", riskLevel: "Médio", detections: 3 },
  { id: 7, lat: -12.97, lng: -38.50, location: "Barra, Salvador", riskLevel: "Alto", detections: 6 },
];

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<typeof mockFocusPoints[0] | null>(null);

  useEffect(() => {
    // This would normally initialize a map like Mapbox, Google Maps, etc.
    // For this demo, we'll just create a placeholder
    const mapContainer = mapContainerRef.current;
    
    if (!mapContainer) return;

    // In a real implementation, this would be:
    // mapboxgl.accessToken = 'your-mapbox-token';
    // const map = new mapboxgl.Map({
    //   container: mapContainer,
    //   style: 'mapbox://styles/mapbox/light-v10',
    //   center: [-70, -33],
    //   zoom: 3
    // });
    
    // Add points to map
    // mockFocusPoints.forEach(point => {
    //   const marker = new mapboxgl.Marker({
    //     color: point.riskLevel === "Alto" ? "#D62839" : point.riskLevel === "Médio" ? "#F4D35E" : "#0B8B8F"
    //   })
    //     .setLngLat([point.lng, point.lat])
    //     .addTo(map);
    //   
    //   marker.getElement().addEventListener('click', () => {
    //     setSelectedPoint(point);
    //   });
    // });

    // Instead, we'll create a visual placeholder for the map
    const createMapPlaceholder = () => {
      mapContainer.innerHTML = '';
      mapContainer.style.position = 'relative';
      
      // Create a background
      const bg = document.createElement('div');
      bg.style.position = 'absolute';
      bg.style.inset = '0';
      bg.style.backgroundColor = '#e5e7eb';
      bg.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
      mapContainer.appendChild(bg);
      
      // Add mock pin markers
      mockFocusPoints.forEach(point => {
        const x = ((point.lng + 70) / 40) * 100; // Scale longitude to fit in container
        const y = ((point.lat + 40) / 80) * 100; // Scale latitude to fit in container
        
        const marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        marker.style.transform = 'translate(-50%, -50%)';
        marker.style.cursor = 'pointer';
        
        const pin = document.createElement('div');
        pin.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="${
            point.riskLevel === "Alto" ? "#D62839" : 
            point.riskLevel === "Médio" ? "#F4D35E" : "#0B8B8F"
          }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="${
            point.riskLevel === "Alto" ? "#D62839" : 
            point.riskLevel === "Médio" ? "#F4D35E" : "#0B8B8F"
          }" fill-opacity="0.7"/>
          <circle cx="12" cy="10" r="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        
        marker.appendChild(pin);
        marker.addEventListener('click', () => {
          setSelectedPoint(point);
        });
        
        mapContainer.appendChild(marker);
      });
      
      // Add caption text
      const caption = document.createElement('div');
      caption.style.position = 'absolute';
      caption.style.bottom = '10px';
      caption.style.left = '10px';
      caption.style.backgroundColor = 'rgba(255,255,255,0.8)';
      caption.style.padding = '5px 10px';
      caption.style.borderRadius = '4px';
      caption.style.fontSize = '12px';
      caption.innerHTML = 'Mapa interativo - Clique nos pontos para detalhes';
      mapContainer.appendChild(caption);
    };
    
    createMapPlaceholder();
    
    // Cleanup function
    return () => {
      if (mapContainer) {
        mapContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Mapa de Focos de Dengue</CardTitle>
          <CardDescription>
            Visualização geoespacial de focos de dengue detectados através da análise de imagens de drone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map container */}
            <div className="lg:col-span-2">
              <div 
                ref={mapContainerRef} 
                className="h-[500px] rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Map will be rendered here */}
              </div>
            </div>
            
            {/* Legend and info */}
            <div className="space-y-4">
              {/* Risk level legend */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Níveis de Risco</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-dengue-warning mr-2"></div>
                      <span>Alto Risco</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-dengue-yellow mr-2"></div>
                      <span>Médio Risco</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-dengue-primary mr-2"></div>
                      <span>Baixo Risco</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Selected focus point details */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Detalhes do Ponto</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {selectedPoint ? (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Localização:</p>
                        <p className="text-sm">{selectedPoint.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nível de Risco:</p>
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full mr-2 ${
                            selectedPoint.riskLevel === "Alto" 
                              ? "bg-dengue-warning" 
                              : selectedPoint.riskLevel === "Médio"
                              ? "bg-dengue-yellow"
                              : "bg-dengue-primary"
                          }`}></div>
                          <span className="text-sm">{selectedPoint.riskLevel}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Detecções:</p>
                        <p className="text-sm">{selectedPoint.detections} potenciais focos</p>
                      </div>
                      <div className="pt-2">
                        <Button 
                          size="sm" 
                          className="text-xs w-full bg-dengue-primary hover:bg-dengue-dark"
                        >
                          Ver Detalhes Completos
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                      <MapPin className="h-10 w-10 mb-2 opacity-20" />
                      <p>Selecione um ponto no mapa para ver os detalhes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Summary stats */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total de pontos:</span>
                      <span className="font-medium">{mockFocusPoints.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Alto risco:</span>
                      <span className="font-medium">{mockFocusPoints.filter(p => p.riskLevel === "Alto").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Médio risco:</span>
                      <span className="font-medium">{mockFocusPoints.filter(p => p.riskLevel === "Médio").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Baixo risco:</span>
                      <span className="font-medium">{mockFocusPoints.filter(p => p.riskLevel === "Baixo").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
          <Button size="sm" className="bg-dengue-primary hover:bg-dengue-dark">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Relatório de Risco
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Informações sobre os Dados</CardTitle>
            <CardDescription>
              Entenda como estes dados são coletados e analisados.
            </CardDescription>
          </div>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p>
              Os pontos exibidos neste mapa representam locais onde foram detectados possíveis focos de dengue através de análise de imagens de drone.
            </p>
            <p>
              A classificação de risco é baseada em diversos fatores, incluindo:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Número de potenciais criadouros do mosquito detectados</li>
              <li>Tipo de criadouro (caixa d'água aberta, calhas entupidas, recipientes com água parada)</li>
              <li>Proximidade com áreas de alta incidência de casos de dengue</li>
              <li>Densidade populacional da região</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
