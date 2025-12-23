import { Amount } from "../Amount";

const ActionModal = ({
  callAmount,
  isGameStarted,
  maxBet,
  raiseInput,
  setRaiseInput,
  onCall,
  onFold,
  onRaise,
}) => (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Action Required</h2>
      <p className="label">
        Call amount: <Amount value={callAmount} />
      </p>
      <div className="actions">
        <button className="btn btn-secondary" onClick={onCall} disabled={!isGameStarted}>
          Call
        </button>
        <button className="btn btn-danger" onClick={onFold} disabled={!isGameStarted}>
          Fold
        </button>
      </div>
      <div className="field-group">
        <label className="label">Raise amount</label>
        <input
          type="number"
          min="1"
          max={maxBet}
          value={raiseInput}
          onChange={(event) => setRaiseInput(Number(event.target.value) || 0)}
        />
      </div>
      <button className="btn btn-primary" onClick={onRaise} disabled={!isGameStarted}>
        Raise
      </button>
    </div>
  </div>
);

export default ActionModal;
