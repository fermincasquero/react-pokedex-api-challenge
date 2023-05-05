import { css } from "@emotion/react";
import { PokemonDetail } from "../types";
import PokemonCard from "./PokemonCard";

type Props = {
  items: PokemonDetail[];
};

const PokedexList: React.FC<Props> = ({ items }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto auto auto;
        padding: 10px;
        gap: 6px;
      `}
    >
      {items.map((item) => (
        <PokemonCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default PokedexList;
