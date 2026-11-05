import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Braces, 
  Zap, 
  BarChart3, 
  Eye, 
  Code, 
  Rocket, 
  CheckCircle 
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-health-800 to-health-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Soluções Tecnológicas Inovadoras
              </h1>
              <p className="text-xl mb-8">
                Transformamos problemas complexos em soluções simples e eficientes para um mundo melhor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  size="lg" 
                  className="bg-white text-health-800 hover:bg-gray-100"
                >
                  Acessar Sistema
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Conheça Nossos Serviços
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative">
                  <Zap className="h-32 w-32 mx-auto text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-800">Quem Somos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em desenvolver soluções tecnológicas que resolvem problemas reais de forma eficiente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-health-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-health-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inovação</h3>
              <p className="text-gray-600">
                Apostamos em soluções inovadoras e criativas para resolver problemas complexos.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-health-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-health-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simplicidade</h3>
              <p className="text-gray-600">
                Transformamos problemas complexos em pequenas partes para soluções mais ágeis.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-health-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-health-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visão</h3>
              <p className="text-gray-600">
                Enxergamos oportunidades onde outros veem obstáculos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-800">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos um portfólio completo de soluções tecnológicas para seu negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <Code className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Desenvolvimento de Software</h3>
              <p className="text-gray-600 mb-4">
                Sistemas personalizados, sites responsivos e aplicativos móveis de alta performance.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <Zap className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Monitoramento com Drones</h3>
              <p className="text-gray-600 mb-4">
                Soluções inovadoras com drones para mapeamento, inspeção e coleta de dados.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <BarChart3 className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Análise de Dados</h3>
              <p className="text-gray-600 mb-4">
                Transformamos dados brutos em insights valiosos para tomada de decisão.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <Braces className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Integração de Sistemas</h3>
              <p className="text-gray-600 mb-4">
                Conectamos sistemas existentes para criar fluxos de trabalho eficientes.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <Eye className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">DengueEye</h3>
              <p className="text-gray-600 mb-4">
                Sistema especializado para monitoramento e controle de focos de dengue via drones.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <Rocket className="h-12 w-12 text-health-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Consultoria em Inovação</h3>
              <p className="text-gray-600 mb-4">
                Ajudamos sua empresa a descobrir e implementar soluções inovadoras.
              </p>
              <Button variant="link" className="text-health-600 p-0">
                Saiba mais →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-800">DengueEye</h2>
              <p className="text-xl text-gray-600 mb-6">
                Nossa solução proprietária para monitoramento e controle de focos de dengue
                utilizando tecnologia de drones e inteligência artificial.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-health-600 mr-2" />
                  <span>Detecção automática de possíveis focos de dengue</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-health-600 mr-2" />
                  <span>Mapeamento de áreas de risco</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-health-600 mr-2" />
                  <span>Geração de relatórios para ações preventivas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-health-600 mr-2" />
                  <span>Sistema de alertas para agentes de saúde</span>
                </li>
              </ul>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-health-600 hover:bg-health-700 text-white"
              >
                Acessar o Sistema
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-health-800 p-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1579164415148-e3d7b04e7c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="DengueEye Dashboard" 
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-health-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em contato</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Estamos prontos para discutir como podemos ajudar sua empresa a inovar e resolver problemas com soluções tecnológicas.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Assunto</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mensagem</label>
                <textarea 
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 h-32"
                  placeholder="Descreva sua necessidade..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-white text-health-800 hover:bg-gray-100">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-health-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
              <p className="text-health-100">
                Empresa de tecnologia focada em soluções inovadoras que resolvem problemas reais.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Soluções</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-health-100 hover:text-white">Desenvolvimento de Software</a></li>
                <li><a href="#" className="text-health-100 hover:text-white">Monitoramento com Drones</a></li>
                <li><a href="#" className="text-health-100 hover:text-white">Análise de Dados</a></li>
                <li><a href="#" className="text-health-100 hover:text-white">Integração de Sistemas</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-health-100">contato@dengueeye.com.br</li>
                <li className="text-health-100">(11) 9999-9999</li>
                <li className="text-health-100">São Paulo, SP - Brasil</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-health-100 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-health-100 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-health-100 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-health-100 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-health-700 mt-12 pt-8 text-center text-health-200">
            <p>&copy; {new Date().getFullYear()} DengueEye Tech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
