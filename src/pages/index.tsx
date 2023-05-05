import { css } from "@emotion/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePokemonPaginationWithFilter } from "../hooks";
import PokedexList from "../components/PokedexList";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState("");

  const { pokemonDetails, hasMore } = usePokemonPaginationWithFilter({
    filter: searchParams.get("filter") || "",
    page: parseInt(searchParams.get("page") || "0"),
  });

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchParams({ filter: input, page: "0" });
  };

  useEffect(() => {
    setInput(searchParams.get("filter") || "");
  }, [searchParams]);

  const page = useMemo(() => {
    return parseInt(searchParams.get("page") || "0");
  }, [searchParams]);

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
          <button
            disabled={!page}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("page", (page - 1).toString());
                return prev;
              })
            }
          >
            Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("page", (page + 1).toString());
                return prev;
              })
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
