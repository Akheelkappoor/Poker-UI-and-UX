import { useGame } from "../../context/GameContext";

const CreateRoomForm = () => {
  const { ui, setupActions } = useGame();

  return (
    <>
      <div className="enter-layout">
        <div className="enter-panel">
          <p className="panel-title">Players</p>
          <p className="panel-sub">
            Add names. This will auto-generate fields based on player count.
          </p>
          <div className="field-group">
            <label className="label">Number of players</label>
            <input
              type="number"
              min="1"
              max="9"
              value={ui.setupForm.numberOfPlayersInput}
              onChange={(event) =>
                setupActions.handleSetupCountChange(
                  event.target.value,
                  ui.setSetupForm
                )
              }
              onBlur={() =>
                setupActions.handleSetupCountBlur(ui.setupForm, ui.setSetupForm)
              }
              placeholder="Number of players"
            />
          </div>
          <div className="players-grid">
            {ui.setupForm.names.map((name, index) => (
              <div className="field-group" key={`name-${index}`}>
                <label className="label">
                  {index === 0 ? "Your name" : `Player ${index + 1} name`}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setupActions.handleSetupName(
                      index,
                      event.target.value,
                      ui.setSetupForm
                    )
                  }
                  placeholder={
                    index === 0 ? "Your name" : `Player ${index + 1} name`
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="enter-panel">
          <p className="panel-title">Table Rules</p>
          <p className="panel-sub">
            Set your buy-in constraints. Keep it simple and enforceable.
          </p>
          <div className="row2">
            <div className="field-group">
              <label className="label">Min amount</label>
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
                placeholder="Min amount"
              />
            </div>
            <div className="field-group">
              <label className="label">Max amount</label>
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
                placeholder="Max amount"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cta-bar">
        <p className="hint">
          Create generates a private code to share. Join uses an existing code.
        </p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setupActions.handleCreateRoom(ui.setupForm)}
          disabled={ui.setupLoading}
        >
          {ui.setupLoading ? "Creating room..." : "Create Room"}
        </button>
      </div>
      {ui.setupError ? <div className="error">{ui.setupError}</div> : null}
    </>
  );
};

export default CreateRoomForm;
