
import React, { useState, useMemo, useEffect } from 'react';
import { GENRE_DATA } from './constants';
import { Genre } from './types';
import RadarChart from './components/RadarChart';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Standard' | 'K-POP'>('All');
  const [selectedGenreId, setSelectedGenreId] = useState<number>(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<{text: string, desc: string} | null>(null);
  const [userConcept, setUserConcept] = useState('');

  const filteredGenres = useMemo(() => {
    return GENRE_DATA.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const selectedGenre = useMemo(() => {
    return GENRE_DATA.find(g => g.id === selectedGenreId) || GENRE_DATA[0];
  }, [selectedGenreId]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateAIPrompt = async () => {
    if (!userConcept.trim()) return;
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional Suno v5 music prompt for the genre "${selectedGenre.name}" with the specific concept: "${userConcept}". 
        Return ONLY a JSON object with keys "prompt" (the English tags) and "description" (a brief Korean explanation). 
        Format: {"prompt": "...", "description": "..."}`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      if (result.prompt) {
        setCustomPrompt({ text: result.prompt, desc: result.description });
      }
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setAiLoading(false);
    }
  };

  const accentColor = selectedGenre.category === 'K-POP' ? '#db2777' : '#3b82f6';
  const accentBg = selectedGenre.category === 'K-POP' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600';

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto transition-colors duration-500">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between border-b pb-6 border-gray-200">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Suno v5 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Prompt Lab</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            전문적인 음악 생성을 위한 고해상도 장르 가이드
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col max-h-[calc(100vh-140px)]">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
              {['All', 'Standard', 'K-POP'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    categoryFilter === cat 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="장르 검색..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scroll">
            {filteredGenres.map(genre => (
              <button 
                key={genre.id}
                onClick={() => {
                  setSelectedGenreId(genre.id);
                  setCustomPrompt(null);
                  setUserConcept('');
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border flex justify-between items-center group transform-gpu active:scale-[0.98] ${
                  selectedGenreId === genre.id 
                    ? 'bg-white border-gray-900 ring-2 ring-gray-900 ring-inset text-gray-900 shadow-md' 
                    : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <span className="font-bold tracking-tight">{genre.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  selectedGenreId === genre.id 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {genre.category}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-8">
          {/* Genre Detail Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 relative overflow-hidden group">
             {/* Decorative Background */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-700 ${
              selectedGenre.category === 'K-POP' ? 'bg-pink-500' : 'bg-blue-500'
            }`}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${accentBg}`}>
                    {selectedGenre.category}
                  </span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter leading-none">
                  {selectedGenre.name}
                </h2>
                <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                  {selectedGenre.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedGenre.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-400 font-bold border border-gray-100 hover:border-gray-300 transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-[320px] bg-gray-50/50 backdrop-blur-sm rounded-3xl p-4 border border-gray-100 flex items-center justify-center">
                <RadarChart data={selectedGenre.attr} color={accentColor} />
              </div>
            </div>
          </div>

          {/* AI Refiner Tool */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Smart Refiner</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text"
                placeholder="어떤 느낌을 추가할까요? (예: 새벽 감성, 사이버펑크, 여름축제)"
                value={userConcept}
                onChange={(e) => setUserConcept(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateAIPrompt()}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={generateAIPrompt}
                disabled={aiLoading || !userConcept}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {aiLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : '생성하기'}
              </button>
            </div>

            {customPrompt && (
              <div 
                onClick={() => handleCopy(customPrompt.text)}
                className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all animate-in fade-in zoom-in duration-300 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Custom Generated Prompt</span>
                  <svg className="w-4 h-4 text-white/30 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <p className="text-lg font-mono font-bold text-white mb-2 leading-tight">{customPrompt.text}</p>
                <p className="text-sm text-white/60">"{customPrompt.desc}"</p>
              </div>
            )}
          </div>

          {/* Prompt Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center px-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
              Curated Prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGenre.prompts.map((p, i) => (
                <div 
                  key={i}
                  onClick={() => handleCopy(p.text)}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <svg className="w-4 h-4 text-gray-200 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-900 font-mono text-[13px] font-bold mb-4 leading-snug">
                      {p.text}
                    </p>
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-xs text-gray-400 font-medium italic">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 transform-gpu ${
          toastVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-green-500 p-1 rounded-full">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <span>복사 완료! Suno에 붙여넣으세요.</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;
