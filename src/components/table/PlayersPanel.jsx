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
    <article className="card players-card" id="desktopTab-players">
      <div className="inner">
        <div className="playersHdr">
          <div>
            <h2 style={{ margin: 0 }}>Players in Pool</h2>
            <p className="kicker" style={{ margin: "6px 0 0" }}>
              Seated players
            </p>
          </div>
          <div className="count">{players.length}</div>
        </div>
        <div className="playerList">
          {ordered.map((player) => {
            const account =
              accounts.find((entry) => entry.name === player.name) || null;
            const contribution = getContribution(account);
            const readiness = account?.openToBet ? "Action" : "Ready";
            return (
              <div className="player" key={`${player.name}-${player.status}`}>
                <div>
                  <div className="pName">{player.name}</div>
                  <div className="pMeta">
                    <span>{player.status}</span>
                    <span>
                      <Amount value={contribution} size="sm" />
                    </span>
                  </div>
                </div>
                <div className="pillSmall">{readiness}</div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default PlayersPanel;
