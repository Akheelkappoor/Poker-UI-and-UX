import { Amount } from "../Amount";

const ActionModal = ({
  callAmount,
  isGameStarted,
  maxBet,
  minRaise,
  raiseInput,
  setRaiseInput,
  maxRaiseExtra,
  onMinRaise,
  onMaxRaise,
  onCall,
  onFold,
  onRaise,
  onClose,
}) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal action-modal" onClick={(event) => event.stopPropagation()}>
      <div className="modal-head">
        <div>
          <p className="modal-eyebrow">Your turn</p>
          <h2>Action Required</h2>
        </div>
        <div className="call-pill">
          Call <Amount value={callAmount} />
        </div>
      </div>
      <div className="modal-actions">
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
          className="raise-input"
          type="number"
          min={minRaise}
          max={maxBet}
          value={raiseInput}
          onChange={(event) => setRaiseInput(Number(event.target.value) || 0)}
        />
        <div className="quick-actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onMinRaise}
            disabled={!isGameStarted}
          >
            Min
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onMaxRaise}
            disabled={!isGameStarted || maxRaiseExtra <= 0}
          >
            Max
          </button>
        </div>
        <p className="label subtle">
          Minimum raise: <Amount value={minRaise} size="sm" /> · Total{" "}
          <Amount value={callAmount + (Number(raiseInput) || 0)} size="sm" />
        </p>
      </div>
      <button className="btn btn-primary full" onClick={onRaise} disabled={!isGameStarted}>
        Raise
      </button>
    </div>
  </div>
);

export default ActionModal;
