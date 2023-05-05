import { css } from "@emotion/react";

const styles = {
  root: css`
    background-color: white;
    min-height: 500px;
  `,
};

const Pokedex: React.FC = () => {
  return <div css={styles.root}></div>;
};

export default Pokedex;
