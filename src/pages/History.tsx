import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { RootState } from "../store";
import { HistoryState } from "../reducers/history";

const History = () => {
  const searchHistory = useSelector<RootState, HistoryState>((state) => state.history);

  return (
    <div>
      <h3>Search History</h3>

      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {searchHistory.map((history) => (
          <Link to={history}>{window.location.hostname + history}</Link>
        ))}
      </div>
    </div>
  );
};

export default History;
