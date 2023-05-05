type PokemonPaginationResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type PokemonSummary = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default?: string;
    back_shiny?: string;
    back_female?: string;
    back_shiny_female?: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonsResponse = PokemonPaginationResponse<PokemonSummary>;
