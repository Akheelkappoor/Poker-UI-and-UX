import { Amount } from "../Amount";
import { getContribution } from "../../utils/game";

const sortPlayers = (players) => {
  const next = [...players];
  next.sort((a, b) => {
    if (a.status === "You" && b.status !== "You") return -1;
    if (b.status === "You" && a.status !== "You") return 1;
    return 0;
  });
  return next;
};

const PlayersPanel = ({ players, accounts }) => {
  const ordered = sortPlayers(players);
  return (
  <div className="panel">
    <h2>Players in Pool</h2>
    <div className="player-count">
      <strong>{players.length}</strong>
      <span className="label">Seated players</span>
    </div>
    <div className="player-list">
      {ordered.map((player) => {
        const account =
          accounts.find((entry) => entry.name === player.name) || null;
        const contribution = getContribution(account);
        return (
          <div className="player-row" key={`${player.name}-${player.status}`}>
            <span>{player.name}</span>
            <span className="label">
              {player.status} · <Amount value={contribution} size="sm" />
            </span>
          </div>
        );
      })}
    </div>
  </div>
  );
};

export default PlayersPanel;
