
import React, { useState, useMemo, useEffect } from 'react';
import { GENRE_DATA } from './constants';
import { Genre } from './types';
import RadarChart from './components/RadarChart';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number>(1);
  const [toastVisible, setToastVisible] = useState(false);

  const filteredGenres = useMemo(() => {
    return GENRE_DATA.filter(g => 
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  const accentColor = selectedGenre.category === 'K-POP' ? '#db2777' : '#3b82f6';
  const accentBg = selectedGenre.category === 'K-POP' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600';

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between border-b pb-6 border-gray-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Suno v5 Prompt Lab Pro
          </h1>
          <p className="text-gray-500 mt-2 font-medium italic">
            {GENRE_DATA.length}가지 장르 x 각 {selectedGenre.prompts.length}개 프롬프트
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col max-h-[calc(100vh-180px)] overflow-hidden">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4 sticky top-0">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="장르 검색..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scroll scrollbar-thin scrollbar-thumb-gray-300">
            {filteredGenres.map(genre => (
              <button 
                key={genre.id}
                onClick={() => setSelectedGenreId(genre.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border flex justify-between items-center group ${
                  selectedGenreId === genre.id 
                    ? 'bg-gray-900 border-gray-900 text-white shadow-lg' 
                    : 'bg-white border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="font-bold">{genre.name}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase transition-colors ${
                  selectedGenreId === genre.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {genre.category}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-6">
          {/* Genre Detail Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${accentBg}`}>
                    {selectedGenre.category}
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  {selectedGenre.name}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {selectedGenre.desc}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {selectedGenre.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white rounded text-[11px] text-gray-500 font-bold border border-gray-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <RadarChart data={selectedGenre.attr} color={accentColor} />
              </div>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                추천 프롬프트 세트 ({selectedGenre.prompts.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGenre.prompts.map((p, i) => (
                <div 
                  key={i}
                  onClick={() => handleCopy(p.text)}
                  className="group bg-white p-5 rounded-2xl border-l-4 border-gray-200 border-t border-r border-b cursor-pointer shadow-sm hover:shadow-md hover:border-l-blue-500 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
                  style={{ animation: `fadeIn 0.4s ease forwards`, animationDelay: `${i * 0.05}s` }}
                >
                  <div>
                    <p className="text-gray-900 font-mono text-sm font-black mb-3 leading-snug break-words">
                      {p.text}
                    </p>
                    <p className="text-xs text-gray-500 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 italic group-hover:bg-white transition-colors">
                      "{p.desc}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span>📋 프롬프트가 복사되었습니다!</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default App;
