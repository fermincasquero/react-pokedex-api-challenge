import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import { usePokemonPaginationWithFilter } from "../hooks";
import PokedexList from "./PokedexList";

const styles = {
  root: css`
    background-color: white;
    min-height: 500px;
    color: black;
  `,
  searchInput: css`
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    flex-grow: 1;
    background-color: white;
    color: black;
    height: 50px;
    &:focus {
      border-width: 2px;
      border-color: purple;
    }
  `,
  inputHeader: css`
    margin: 0px;
  `,
  searchBar: css`
    padding: 12px 24px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
  `,
  submitButton: css`
    height: 50px;
  `,
};

const Pokedex: React.FC = () => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);

  const { pokemonDetails, hasMore } = usePokemonPaginationWithFilter({ filter, page });

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setFilter(input);
  };

  return (
    <div css={styles.root}>
      <div css={styles.searchBar}>
        <form onSubmit={handleSearchSubmit}>
          <h2 css={styles.inputHeader}>Name</h2>

          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 16px;
              margin-top: 8px;
            `}
          >
            <input css={styles.searchInput} value={input} onChange={(e) => setInput(e.target.value)} />
            <button css={styles.submitButton} type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 12px 24px;
        `}
      >
        {!!pokemonDetails && <PokedexList items={pokemonDetails} />}

        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 8px;
          `}
        >
          <button disabled={page == 0} onClick={() => setPage((page) => page - 1)}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={() => setPage((page) => page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
