
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Camera, Check, Info, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  id: string;
  imageUrl: string;
  thumbnail: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hasDengueRisk: boolean;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
  detections: Array<{
    type: string;
    confidence: number;
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
  timestamp: string;
}

const ImageAnalysis = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeImages = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione pelo menos uma imagem para análise.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      // Mock results
      const mockResults: AnalysisResult[] = selectedFiles.map((file, index) => {
        const hasDengueRisk = Math.random() > 0.5;
        const riskLevel: ('Baixo' | 'Médio' | 'Alto') = hasDengueRisk 
          ? (Math.random() > 0.5 ? 'Alto' : 'Médio') 
          : 'Baixo';
          
        return {
          id: `analysis-${Date.now()}-${index}`,
          imageUrl: URL.createObjectURL(file),
          thumbnail: URL.createObjectURL(file),
          location: "Localização não especificada",
          coordinates: {
            lat: -23.55 + (Math.random() * 0.1),
            lng: -46.63 + (Math.random() * 0.1)
          },
          hasDengueRisk,
          riskLevel,
          detections: hasDengueRisk ? [
            {
              type: Math.random() > 0.5 ? "Caixa d'água aberta" : "Água parada",
              confidence: 0.75 + (Math.random() * 0.2),
              boundingBox: {
                x: 0.2 + (Math.random() * 0.3),
                y: 0.2 + (Math.random() * 0.3),
                width: 0.2,
                height: 0.2
              }
            },
            {
              type: "Calha entupida",
              confidence: 0.65 + (Math.random() * 0.2),
              boundingBox: {
                x: 0.5 + (Math.random() * 0.3),
                y: 0.5 + (Math.random() * 0.3),
                width: 0.15,
                height: 0.15
              }
            }
          ] : [],
          timestamp: new Date().toISOString()
        };
      });
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);

      toast({
        title: "Análise concluída",
        description: `${mockResults.length} imagens foram analisadas com sucesso.`,
      });
      
      // Clear selected files after analysis
      setSelectedFiles([]);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Análise de Imagens de Drone</CardTitle>
          <CardDescription>
            Faça upload de imagens de drone para detecção automática de possíveis focos de dengue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 bg-gray-50">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="file-upload" className="cursor-pointer bg-dengue-primary text-white py-2 px-4 rounded hover:bg-dengue-dark transition-colors">
                Selecionar Imagens
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={isAnalyzing}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Arraste e solte arquivos ou clique para selecionar
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Formatos suportados: JPG, PNG, TIFF - Max. 20MB por arquivo
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Arquivos Selecionados ({selectedFiles.length})</h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Preview"
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      disabled={isAnalyzing}
                      className="text-gray-400 hover:text-dengue-warning"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedFiles([])}
            disabled={selectedFiles.length === 0 || isAnalyzing}
          >
            Limpar
          </Button>
          <Button 
            onClick={analyzeImages}
            disabled={selectedFiles.length === 0 || isAnalyzing}
            className="bg-dengue-primary hover:bg-dengue-dark"
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analisando...
              </>
            ) : (
              'Analisar Imagens'
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysisResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Análise</CardTitle>
            <CardDescription>
              Detecção de possíveis focos de dengue baseada em imagens de drone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisResults.map((result) => (
                <Card key={result.id} className={`overflow-hidden ${
                  result.hasDengueRisk ? 'border-dengue-warning' : 'border-green-500'
                }`}>
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={result.imageUrl} 
                      alt="Drone image" 
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-2 right-2 rounded-full p-1 ${
                      result.hasDengueRisk 
                        ? 'bg-dengue-warning text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {result.hasDengueRisk ? (
                        <AlertTriangle size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1 flex items-center">
                      {result.hasDengueRisk ? (
                        <>
                          <AlertTriangle size={16} className="mr-1 text-dengue-warning" />
                          <span>Risco Detectado</span>
                        </>
                      ) : (
                        <>
                          <Check size={16} className="mr-1 text-green-500" />
                          <span>Sem Risco Detectado</span>
                        </>
                      )}
                    </h3>
                    
                    {result.hasDengueRisk && (
                      <div className="mt-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Nível de Risco:</span>{' '}
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            result.riskLevel === 'Alto' 
                              ? 'bg-dengue-warning/10 text-dengue-warning' 
                              : result.riskLevel === 'Médio' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {result.riskLevel}
                          </span>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium">Detecções:</span>
                          <ul className="mt-1 list-disc list-inside text-xs">
                            {result.detections.map((detection, i) => (
                              <li key={i}>
                                {detection.type} ({(detection.confidence * 100).toFixed(0)}% confiança)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Info size={12} className="mr-1" />
                        Clique para mais detalhes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-gray-500">
              Imagens analisadas: {analysisResults.length}
            </div>
            <Button className="bg-dengue-primary hover:bg-dengue-dark">
              Gerar Relatório
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ImageAnalysis;
