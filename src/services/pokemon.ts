import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { POKEMONS_API_URL } from "../constants";
import type { PokemonDetail, PokemonSummary, PokemonsResponse } from "../types";

export const pokemonApi = createApi({
  reducerPath: "pokemons",
  baseQuery: fetchBaseQuery({ baseUrl: POKEMONS_API_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonSummary[], undefined>({
      query: () => "pokemon?limit=10000",
      transformResponse: (response: PokemonsResponse) => response.results,
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({ query: (name) => `pokemon/${name}` }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
