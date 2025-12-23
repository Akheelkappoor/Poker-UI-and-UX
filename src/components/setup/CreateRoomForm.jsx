import { useGame } from "../../context/GameContext";

const CreateRoomForm = () => {
  const { ui, setupActions } = useGame();

  return (
    <>
      <p className="label">Create a room with player names.</p>
      <div className="field-group">
        <label className="label">Number of players</label>
        <input
          type="number"
          min="1"
          max="9"
          value={ui.setupForm.numberOfPlayersInput}
          onChange={(event) =>
            setupActions.handleSetupCountChange(event.target.value, ui.setSetupForm)
          }
          onBlur={() =>
            setupActions.handleSetupCountBlur(ui.setupForm, ui.setSetupForm)
          }
          placeholder="Number of players"
        />
      </div>
      <div className="name-grid">
        {ui.setupForm.names.map((name, index) => (
          <div className="field-group" key={`name-${index}`}>
            <label className="label">
              {index === 0 ? "Your name" : `Player ${index + 1} name`}
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) =>
                setupActions.handleSetupName(index, event.target.value, ui.setSetupForm)
              }
              placeholder={index === 0 ? "Your name" : `Player ${index + 1} name`}
            />
          </div>
        ))}
      </div>
      <div className="field-group">
        <label className="label">Max amount per player</label>
        <input
          type="number"
          min="1"
          step="5"
          value={ui.setupForm.maxAmount}
          onChange={(event) =>
            ui.setSetupForm((prev) => ({
              ...prev,
              maxAmount: Number(event.target.value) || 0,
            }))
          }
          placeholder="Max amount per player"
        />
      </div>
      <div className="field-group">
        <label className="label">Min amount per player</label>
        <input
          type="number"
          min="1"
          step="5"
          value={ui.setupForm.minAmount}
          onChange={(event) =>
            ui.setSetupForm((prev) => ({
              ...prev,
              minAmount: Number(event.target.value) || 0,
            }))
          }
          placeholder="Min amount per player"
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setupActions.handleCreateRoom(ui.setupForm)}
        disabled={ui.setupLoading}
      >
        {ui.setupLoading ? "Creating room..." : "Create Room"}
      </button>
      {ui.setupError ? <div className="error">{ui.setupError}</div> : null}
    </>
  );
};

export default CreateRoomForm;
