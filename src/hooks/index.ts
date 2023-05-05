import { useEffect, useMemo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { pokemonApi, useGetPokemonsQuery } from "../services/pokemon";
import { AppDispatch, RootState } from "../store";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

export const usePokemonPaginationWithFilter = ({ page, filter }: { page: number; filter: string }) => {
  const { data: pokemons = [], isLoading: isLoadingPokemonList } = useGetPokemonsQuery(undefined);

  const filteredPokemons = useMemo(() => {
    const filteredPokemons = [];

    // Pokemons array is large so use for loop to improve performance
    for (let i = 0; i < pokemons.length; i++) {
      if (pokemons[i].name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
        filteredPokemons.push(pokemons[i].name);
      }
    }

    return filteredPokemons.slice(page * 10, (page + 1) * 10);
  }, [pokemons, page, filter]);

  const { isFetched, pokemonDetails, isLoading } = usePokemonDetails(filteredPokemons);

  return { isFetched, pokemonDetails, isLoading: isLoading && isLoadingPokemonList };
};

const pokemonDetailsSelector = (names: string[]) => (state: RootState) => {
  const pokemonDetails = [];
  const pokemonsToLoad = [];
  let isLoading = false;

  for (const name of names) {
    const { data, status } = pokemonApi.endpoints.getPokemonByName.select(name)(state) || {};

    if (status) {
      if (status === QueryStatus.fulfilled) {
        pokemonDetails.push(data);
      } else if (status === QueryStatus.rejected || status === QueryStatus.uninitialized) {
        pokemonsToLoad.push(name);
      } else {
        isLoading = true;
      }
    } else {
      pokemonsToLoad.push(name);
    }
  }

  return { pokemonDetails, pokemonsToLoad, isLoading };
};

const usePokemonDetails = (pokemons: string[]) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemonDetails, pokemonsToLoad, isLoading } = useSelector(pokemonDetailsSelector(pokemons));
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (pokemonsToLoad.length === 0 && !isLoading && !isFetched) {
      setIsFetched(true);
    } else {
      for (const pokemon of pokemonsToLoad) {
        dispatch(pokemonApi.endpoints.getPokemonByName.initiate(pokemon));
      }
    }
  }, [pokemonsToLoad, isLoading, isFetched]);

  return { isFetched, pokemonDetails: isFetched && pokemonDetails, isLoading };
};
