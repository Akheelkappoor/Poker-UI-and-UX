import { Amount } from "../Amount";

const StartGameModal = ({ lowBalancePlayers, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Start Game</h2>
      <p className="label">This will lock the player list and start the hand.</p>
      <div className="warning">
        <strong>Players need top-up</strong>
        <div className="warning-list">
          {lowBalancePlayers.map((player) => (
            <div className="warning-row" key={player.name}>
              <span>{player.name}</span>
              <span className="label">
                Needs <Amount value={player.needed} size="sm" />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default StartGameModal;
