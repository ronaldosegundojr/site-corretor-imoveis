import { useState, useEffect } from 'react';
import { useProperties } from '../hooks/useProperties';

// Componente de teste para debug - Modo Frontend-Only
export function DebugAPI() {
  const { properties } = useProperties();
  
  return (
    <div className="fixed top-4 right-4 bg-primary p-4 rounded-xl shadow-2xl border border-secondary/20 z-[100] max-w-sm animate-fadeIn">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-secondary/20 p-2 rounded-lg">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
        <h3 className="font-bold text-white text-sm">🔍 Status do Sistema</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          <span>Modo:</span>
          <span className="text-secondary">Frontend-Only (Offline)</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          <span>Imóveis Ativos:</span>
          <span className="text-white bg-white/10 px-2 py-0.5 rounded">{properties.length}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          <span>Persistência:</span>
          <span className="text-green-400">LocalStorage ✅</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1">
        <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Diretório Root:</p>
        <p className="text-[9px] text-slate-500 font-mono break-all">c:\Users\Ronaldo\Desktop\site-corretor-imoveis</p>
      </div>
    </div>
  );
}