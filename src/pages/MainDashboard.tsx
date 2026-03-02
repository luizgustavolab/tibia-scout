import { FavoritesList } from '../components/FavoritesList';
import { getFavorites, addFavorite, removeFavorite } from '../lib/favorites';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlassButton } from '../components/v0/glass-button';
import { Input } from '../components/v0/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/v0/ui/card';
import {
  Search,
  User,
  Swords,
  ShieldAlert,
  Clock,
  ScrollText,
  Newspaper,
  Users,
  Gavel,
  ExternalLink,
  AlertTriangle,
  Loader2,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SearchHistory {
  id: string;
  query: string;
  status: string;
  created_at: string;
  user_id: string;
}

function MainDashboard() {
  const navigate = useNavigate();
  const [charName, setCharName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  async function fetchHistory() {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setHistory((data as SearchHistory[]) || []);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  }

  async function loadFavorites(uid: string) {
    try {
      const data = await getFavorites(uid);
      setFavorites(data || []);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetchHistory();
        loadFavorites(user.id);
      }
    });
  }, []);

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

  const openLink = (url: string) => {
    setActiveUrl(url);
    setIframeBlocked(false);
    setIsLoading(true);

    setTimeout(() => {
      setIframeBlocked(true);
      setIsLoading(false);
    }, 500);
  };

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const nameToSearch = charName.trim();

    if (!nameToSearch) return;

    try {
      if (!userId) return;

      const { error } = await supabase.from('search_history').insert([
        {
          query: nameToSearch,
          user_id: userId,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setSearchResult(nameToSearch);
      setCharName('');
      fetchHistory();
    } catch (error) {
      console.error('Erro ao salvar busca:', error);
    }
  }

  const handleToggleFavorite = async (name: string) => {
    if (!userId) return;
    const isFav = favorites.some((f) => f.char_name.toLowerCase() === name.toLowerCase());

    try {
      if (isFav) {
        await removeFavorite(userId, name);
        setFavorites((prev) => prev.filter((f) => f.char_name.toLowerCase() !== name.toLowerCase()));
      } else {
        await addFavorite(userId, name);
        setFavorites((prev) => [...prev, { char_name: name }]);
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5e6c8] space-y-8 p-6 lg:p-10 px-8 lg:px-12 relative overflow-x-hidden">
      <div
        className="fixed inset-0 bg-[url('/wallpaper2.jpg')] bg-fixed bg-cover bg-center -z-20 scale-100 opacity-80"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-black/30 -z-10" />

      <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-6 pr-6">
        <div />
        <div className="w-32 flex justify-end pr-2">
          <GlassButton variant="secondary" onClick={handleLogout}>
            Sair
          </GlassButton>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative group">
            <GlassButton variant="secondary" className="w-full py-2 px-4" onClick={() => openLink('https://www.tibia.com/news/?subtopic=latestnews')}>
              <div className="flex items-center justify-start w-full gap-3">
                <Newspaper className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">News</span>
              </div>
            </GlassButton>
          </div>
          <div className="relative group">
            <GlassButton variant="secondary" className="w-full py-2 px-4" onClick={() => openLink('https://www.tibia.com/community/?subtopic=characters')}>
              <div className="flex items-center justify-start w-full gap-3">
                <Users className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">Community</span>
              </div>
            </GlassButton>
          </div>
          <div className="relative group">
            <GlassButton variant="secondary" className="w-full py-2 px-4" onClick={() => openLink('https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades')}>
              <div className="flex items-center justify-start w-full gap-3">
                <Gavel className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">Bazaar</span>
              </div>
            </GlassButton>
          </div>
        </div>

        {activeUrl && (
          <div className="w-full space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <button onClick={() => setActiveUrl(null)} className="text-[#d4af37] hover:text-white text-sm underline">
                Fechar Visualização
              </button>
            </div>
            <div className="relative w-full h-[600px] rounded-xl border border-[#d4af37]/30 overflow-hidden bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
              {isLoading ? (
                <Loader2 className="h-10 w-10 text-[#d4af37] animate-spin" />
              ) : iframeBlocked ? (
                <div className="text-center space-y-6">
                  <AlertTriangle className="h-16 w-16 text-[#d4af37] mx-auto" />
                  <a href={activeUrl} target="_blank" rel="noreferrer">
                    <GlassButton variant="primary">Abrir Site Oficial</GlassButton>
                  </a>
                </div>
              ) : (
                <iframe src={activeUrl} className="w-full h-full" title="Tibia" />
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-[#d4af37]/30 shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#d4af37]/50" />
            <Input
              placeholder="Ex: Eternal Oblivion..."
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              className="pl-10 bg-black/60 border-[#d4af37]/20 text-[#f5e6c8]"
            />
          </div>
          <GlassButton variant="primary" type="submit" className="sm:w-44">Pesquisar</GlassButton>
        </form>

        {searchResult && (
          <Card className="bg-black/60 border-[#d4af37]/40 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#d4af37]/20">
              <CardTitle className="flex items-center gap-2 text-[#d4af37]">
                <User className="h-5 w-5" /> {searchResult}
              </CardTitle>
              <button onClick={() => handleToggleFavorite(searchResult)} className="p-2">
                <Star size={24} className={favorites.some((f) => f.char_name.toLowerCase() === searchResult.toLowerCase()) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} />
              </button>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center gap-6 text-[#c4b08a]">
                <div className="flex items-center gap-1"><Swords className="h-4 w-4" /> Level: ??</div>
                <div className="flex items-center gap-1"><ShieldAlert className="h-4 w-4" /> Vocation: ??</div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className="flex items-center gap-2 text-[#d4af37] hover:text-white transition-colors font-medieval tracking-widest text-sm"
            >
              <Star size={16} className={showFavorites ? "fill-yellow-400 text-yellow-400" : ""} />
              {showFavorites ? 'OCULTAR FAVORITOS' : 'VER FAVORITOS'}
              {showFavorites ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFavorites && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <FavoritesList
                favorites={favorites}
                onRemove={(name) => handleToggleFavorite(name)}
                onSelect={(name) => {
                  setSearchResult(name);
                  setShowFavorites(false);
                }}
              />
            </div>
          )}

          <Card className="bg-black/40 border-[#d4af37]/20 backdrop-blur-sm">
            <CardHeader className="border-b border-[#d4af37]/10">
              <CardTitle className="flex items-center gap-2 text-[#d4af37] font-medieval tracking-widest uppercase text-sm">
                <ScrollText className="h-5 w-5" /> Últimas Consultas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#d4af37]/10 bg-[#d4af37]/5 text-[#c4b08a] text-xs uppercase">
                      <th className="p-4">Personagem</th>
                      <th className="p-4">Data/Hora</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr key={item.id} className="border-b border-[#d4af37]/5 hover:bg-white/5 cursor-pointer" onClick={() => setSearchResult(item.query)}>
                        <td className="p-4 font-bold text-white">{item.query}</td>
                        <td className="p-4 text-sm text-[#c4b08a]/60"><Clock className="h-3 w-3 inline mr-1" />{new Date(item.created_at).toLocaleString('pt-BR')}</td>
                        <td className="p-4 text-right"><span className="px-2 py-1 rounded-full text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase">{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;