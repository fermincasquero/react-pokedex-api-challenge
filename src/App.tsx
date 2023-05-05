import { css } from "@emotion/react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import History from "./pages/History";
import Pokedex from "./pages";

const styles = {
  root: css`
    width: 100vw;
  `,
  container: css`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `,
  header: css`
    color: lightgray;
    margin: 16px 0px;
  `,
};

function App() {
  return (
    <BrowserRouter>
      <div css={styles.root}>
        <div css={styles.container}>
          <h1 css={styles.header}>Pokedex</h1>

          <Routes>
            <Route path="/" element={<Navigate to="/pokemons" />} />
            <Route path="/pokemons" element={<Pokedex />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
