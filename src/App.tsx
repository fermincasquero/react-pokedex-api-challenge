import { css } from "@emotion/react";
import Pokedex from "./components/Pokedex";

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
    <div css={styles.root}>
      <div css={styles.container}>
        <h1 css={styles.header}>Pokedex</h1>

        <Pokedex />
      </div>
    </div>
  );
}

export default App;
