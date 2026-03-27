import { useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  useEffect(() => {
    // Initialize VLibras widget
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <footer className="bg-primary text-white mt-16 border-t-4 border-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-serif font-bold text-secondary tracking-tighter">
                SUA<span className="text-white font-light ml-1">MARCA</span>
              </h3>
              <p className="text-[10px] text-secondary/80 font-medium tracking-[0.2em] uppercase">Corretor (a) Imobiliário (a)</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Especialista em imóveis de alto padrão e investimentos imobiliários. 
              Compromisso com a transparência e a melhor experiência para o cliente.
            </p>
            <div className="flex gap-4 mt-6">
              <Instagram className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Contato
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-slate-400 font-medium">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>(12) 91234-5678</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 font-medium">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span className="break-all">contato@suamarca.com.br</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 font-medium">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>Av são Carlos, 1234 - Centro</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Links Úteis
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-secondary transition-colors font-medium">Todos os Imóveis</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors font-medium">Casas à Venda</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors font-medium">Apartamentos</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors font-medium">Cadastre seu Imóvel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Credenciais
            </h4>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-secondary font-bold text-lg mb-1">CRECI SP</p>
              <p className="text-white font-mono tracking-wider">123.456-F</p>
              <p className="text-slate-500 text-[10px] mt-2 leading-tight">
                Regularizado junto ao Conselho Regional de Corretores de Imóveis.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-xs font-medium">
          <p>© 2026 Sua Marca. Todos os direitos reservados.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Feito com amor, por Ronaldo A Segundo Junior
          </p>
        </div>
      </div>

      {/* VLibras Widget */}
      <div data-vw="true" className="enabled">
        <div data-vw-access-button="true" className="active"></div>
        <div data-vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </footer>;
}