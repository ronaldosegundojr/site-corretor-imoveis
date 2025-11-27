import React, { useEffect, createElement } from 'react';
import { Heart, Phone, Mail } from 'lucide-react';
export function Footer() {
  useEffect(() => {
    // Initialize VLibras widget
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <footer className="bg-golden-dark text-white mt-16 border-t-4 border-golden-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/image.png" alt="Perfumaria Golden Logo" className="h-12 w-12 object-contain" />
              <div>
                <h3 className="text-xl font-serif font-bold text-golden-primary">
                  Golden
                </h3>
                <p className="text-xs text-golden-light">PERFUMARIA</p>
              </div>
            </div>
            <p className="text-golden-light text-sm">
              Sua loja completa de produtos de beleza: perfumes, cosméticos,
              cuidados para cabelo, unhas e pele. Qualidade e sofisticação para
              realçar sua beleza.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-golden-primary mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contato
            </h4>
            <p className="text-golden-light text-sm mb-2 flex items-center gap-2">
              <span className="text-golden-primary">WhatsApp:</span> (16)
              99732-0195
            </p>
            <p className="text-golden-light text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-golden-primary" />
              contato@perfumariagolden.com.br
            </p>
          </div>

          <div>
            <h4 className="font-bold text-golden-primary mb-3">
              Acessibilidade
            </h4>
            <p className="text-golden-light text-sm mb-2">
              Este site possui recursos de acessibilidade incluindo:
            </p>
            <ul className="text-golden-light text-sm space-y-1">
              <li>• VLibras (Libras)</li>
              <li>• Alto contraste</li>
              <li>• Navegação por teclado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-golden-brown mt-8 pt-6 text-center text-golden-light text-sm">
          <p className="flex items-center justify-center gap-1">
            Feito com{' '}
            <Heart className="w-4 h-4 text-golden-primary" aria-label="amor" />{' '}
            pela Perfumaria Golden
          </p>
        </div>
      </div>

      {/* VLibras Widget */}
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </footer>;
}