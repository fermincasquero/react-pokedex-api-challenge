import { css } from "@emotion/react";
import type { PokemonDetail } from "../types";

const attributeStyle = css`
  width: 50%;
`;

const cardStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const PokemonCard: React.FC<{ item: PokemonDetail }> = ({ item }) => {
  return (
    <div css={cardStyle}>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <img
          src={item.sprites.front_default}
          width="50%"
          css={css`
            background-color: #eeeeee;
          `}
        />
        <div
          css={css`
            padding: 12px;
            width: 50%;
          `}
        >
          <h3
            css={css`
              margin: 0px;
            `}
          >
            {item.name}
          </h3>
          <div
            css={css`
              margin: 0px;
            `}
          >
            Height: {item.height}
          </div>
          <div
            css={css`
              margin: 0px;
            `}
          >
            Weight: {item.weight}
          </div>

          <div
            css={css`
              margin: 0px;
              display: flex;
              flex-direction: row;
              line-break: anywhere;
            `}
          >
            Type:
            <div
              css={css`
                line-break: anywhere;
                margin-left: 8px;
              `}
            >
              {item.types.map(({ type: { name } }) => name).join(",")}
            </div>
          </div>

          <div
            css={css`
              margin: 0px;
              display: flex;
              flex-direction: row;
            `}
          >
            Abilities:
            <div
              css={css`
                line-break: anywhere;
                margin-left: 8px;
              `}
            >
              {item.abilities.map(({ ability: { name } }) => name).join(",")}
            </div>
          </div>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex: 1;
        `}
      ></div>
    </div>
  );
};

export default PokemonCard;
