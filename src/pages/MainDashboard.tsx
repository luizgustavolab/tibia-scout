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
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);

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

  useEffect(() => {
    fetchHistory();
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('search_history').insert([
        {
          query: nameToSearch,
          user_id: user.id,
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
            <GlassButton
              variant="secondary"
              className="w-full py-2 px-4"
              onClick={() => openLink('https://www.tibia.com/news/?subtopic=latestnews')}
            >
              <div className="flex items-center justify-start w-full gap-3">
                <Newspaper className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">News</span>
              </div>
            </GlassButton>
            <a
              href="https://www.tibia.com/news/?subtopic=latestnews"
              target="_blank"
              rel="noreferrer"
              className="absolute top-1 right-1 p-1 text-[#d4af37]/40 hover:text-[#d4af37] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="relative group">
            <GlassButton
              variant="secondary"
              className="w-full py-2 px-4"
              onClick={() => openLink('https://www.tibia.com/community/?subtopic=characters')}
            >
              <div className="flex items-center justify-start w-full gap-3">
                <Users className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">Community</span>
              </div>
            </GlassButton>
            <a
              href="https://www.tibia.com/community/?subtopic=characters"
              target="_blank"
              rel="noreferrer"
              className="absolute top-1 right-1 p-1 text-[#d4af37]/40 hover:text-[#d4af37] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="relative group">
            <GlassButton
              variant="secondary"
              className="w-full py-2 px-4"
              onClick={() => openLink('https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades')}
            >
              <div className="flex items-center justify-start w-full gap-3">
                <Gavel className="h-5 w-5 text-[#d4af37] shrink-0" />
                <span className="text-[#c4b08a]">Bazaar</span>
              </div>
            </GlassButton>
            <a
              href="https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades"
              target="_blank"
              rel="noreferrer"
              className="absolute top-1 right-1 p-1 text-[#d4af37]/40 hover:text-[#d4af37] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {activeUrl && (
          <div className="w-full space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <a
                href={activeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#c4b08a]/60 hover:text-white text-xs underline"
              >
                <ExternalLink className="h-3 w-3" /> Abrir em nova aba
              </a>
              <button
                onClick={() => {
                  setActiveUrl(null);
                  setIframeBlocked(false);
                  setIsLoading(false);
                }}
                className="text-[#d4af37] hover:text-white text-sm underline"
              >
                Fechar Visualização
              </button>
            </div>
            <div className="relative w-full h-[600px] rounded-xl border border-[#d4af37]/30 overflow-hidden bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
              {isLoading ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-10 w-10 text-[#d4af37] animate-spin" />
                </div>
              ) : iframeBlocked ? (
                <div className="z-30 p-8 text-center space-y-6 max-w-md animate-in fade-in zoom-in duration-200">
                  <AlertTriangle className="h-16 w-16 text-[#d4af37] mx-auto opacity-80" />
                  <p className="text-[#c4b08a]/80 text-sm">
                    O site oficial não permite a visualização interna.
                  </p>
                  <a href={activeUrl} target="_blank" rel="noreferrer" className="block">
                    <GlassButton variant="primary" className="w-full">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5" /> Abrir Site Oficial
                      </div>
                    </GlassButton>
                  </a>
                </div>
              ) : (
                <iframe
                  key={activeUrl}
                  src={activeUrl}
                  className="w-full h-full"
                  title="Conteúdo Tibia"
                />
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 bg-black/40 backdrop-blur-md p-6 pr-8 rounded-xl border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] w-full box-border"
        >
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-[#d4af37]/50 pointer-events-none z-10" />
            <Input
              placeholder="Ex: Eternal Oblivion..."
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              className="pl-10 bg-black/60 border-[#d4af37]/20 text-[#f5e6c8] focus:border-[#d4af37] transition-colors w-full h-10"
            />
          </div>
          <div className="sm:w-44 flex-shrink-0">
            <GlassButton variant="primary" type="submit" className="w-full">
              Pesquisar
            </GlassButton>
          </div>
        </form>
      </div>

      {searchResult && (
        <div className="animate-fade-in-up px-2">
          <Card className="max-w-2xl mx-auto bg-black/60 border-[#d4af37]/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-[#d4af37]/10 border-b border-[#d4af37]/20">
              <CardTitle className="flex items-center gap-2 text-[#d4af37]">
                <User className="h-5 w-5" />
                Resultado da Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <p className="text-xl mb-2">Informações de:</p>
              <h3 className="text-4xl font-medieval text-white mb-4 uppercase tracking-widest">
                {searchResult}
              </h3>
              <div className="flex justify-center gap-6 text-[#c4b08a]">
                <div className="flex items-center gap-1">
                  <Swords className="h-4 w-4" /> Level: ??
                </div>
                <div className="flex items-center gap-1">
                  <ShieldAlert className="h-4 w-4" /> Vocation: ??
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="px-2">
        <Card className="bg-black/40 border-[#d4af37]/20 backdrop-blur-sm border">
          <CardHeader className="border-b border-[#d4af37]/10">
            <CardTitle className="flex items-center gap-2 text-[#d4af37] font-medieval tracking-widest">
              <ScrollText className="h-5 w-5" />
              Últimas Consultas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#d4af37]/10 bg-[#d4af37]/5 text-[#c4b08a] text-xs uppercase">
                    <th className="p-4">Personagem</th>
                    <th className="p-4">Data/Hora</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#d4af37]/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-bold text-white">
                          {item.query}
                        </td>
                        <td className="p-4 text-sm text-[#c4b08a]/60 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date(item.created_at).toLocaleString('pt-BR')}
                        </td>
                        <td className="p-4 text-right">
                          <span className="px-2 py-1 rounded-full text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-tighter">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-10 text-center text-[#c4b08a]/40 italic"
                      >
                        Nenhum histórico de busca encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MainDashboard;