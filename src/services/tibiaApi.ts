const RAILWAY_API_URL =
  import.meta.env.VITE_API_URL || 'https://api-production-0422.up.railway.app';
const TIBIADATA_API_URL = 'https://api.tibiadata.com/v4';

export interface BazaarFilters {
  vocation?: string;
  world?: string;
  minLevel?: number;
  maxLevel?: number;
  sort?: string;
  name?: string;
}

export interface BazaarCharacter {
  id: number;
  name: string;
  level: number;
  vocation: string;
  world: string;
  outfit_url: string;
  price: number;
  auction_end_relative: string;
  skills: string[];
  extras: string[];
  items: any[];
  auctionId?: number;
}

export interface BazaarResponse {
  characters: BazaarCharacter[];
  metadata: {
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function getCharacterData(name: string) {
  try {
    const response = await fetch(
      `${TIBIADATA_API_URL}/character/${encodeURIComponent(name)}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.character?.character) return null;
    const char = data.character.character;
    return {
      name: char.name,
      level: char.level,
      vocation: char.vocation,
      world: char.world,
      status: char.status,
      sex: char.sex,
      achievement_points: char.achievement_points,
      last_login: char.last_login,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTibiaNews() {
  try {
    const response = await fetch(`${TIBIADATA_API_URL}/news/latest`);
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    const data = await response.json();
    return (data?.news || []).slice(0, 5);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTibiaBazaar(
  filters?: BazaarFilters,
  page: number = 1,
): Promise<BazaarResponse> {
  try {
    const params = new URLSearchParams();
    if (filters?.vocation) params.append('vocation', filters.vocation);
    if (filters?.world) params.append('world', filters.world);
    if (filters?.name) params.append('name', filters.name);
    if (filters?.minLevel)
      params.append('minLevel', filters.minLevel.toString());
    if (filters?.maxLevel)
      params.append('maxLevel', filters.maxLevel.toString());
    if (filters?.sort) params.append('sortBy', filters.sort);
    params.append('page', page.toString());

    const response = await fetch(
      `${RAILWAY_API_URL}/characters?${params.toString()}`,
    );
    if (!response.ok) throw new Error('Falha ao buscar dados no Bazaar');

    const result = await response.json();
    const rawCharacters = Array.isArray(result.data) ? result.data : [];

    const mappedCharacters: BazaarCharacter[] = rawCharacters.map(
      (char: any) => {
        const auctionEnd = char.endsAt ? parseInt(char.endsAt) : 0;
        const allSkills = Array.isArray(char.skills) ? char.skills : [];

        const mainSkills = allSkills.filter((s: string) =>
          /Axe|Sword|Club|Distance|Magic|Shielding|Fishing/i.test(s),
        );

        const extras = allSkills.filter(
          (s: string) =>
            !/Axe|Sword|Club|Distance|Magic|Shielding|Fishing/i.test(s),
        );

        return {
          id: char.id,
          name: String(char.name || 'Unknown'),
          level: Number(char.level || 0),
          vocation: String(char.vocation || 'None'),
          world: String(char.world || 'Unknown'),
          outfit_url: String(char.outfitUrl || char.outfit_url || ''),
          price: Number(char.price || 0),
          auction_end_relative:
            auctionEnd > 0
              ? new Date(auctionEnd * 1000).toLocaleString('pt-BR')
              : 'N/A',
          skills: mainSkills,
          extras: extras,
          items: Array.isArray(char.items) ? char.items : [],
          auctionId: char.auctionId,
        };
      },
    );

    return {
      characters: mappedCharacters,
      metadata: result.metadata || {
        total: 0,
        page: 1,
        totalPages: 1,
        hasMore: false,
      },
    };
  } catch (error) {
    console.error('Erro no fetch do Bazaar:', error);
    return {
      characters: [],
      metadata: { total: 0, page: 1, totalPages: 1, hasMore: false },
    };
  }
}
