const ShowdownModal = ({ loading, onClose, onLoss, onWin, step }) => (
  <div className="round-modal">
    <div className="round-card showdown-card">
      {step === "prompt" ? (
        <>
          <p className="label">Showdown</p>
          <h2>Did you win this hand?</h2>
          <div className="showdown-actions">
            <button
              className="btn btn-primary"
              onClick={onWin}
              disabled={loading}
            >
              I Won
            </button>
            <button
              className="btn btn-ghost"
              onClick={onLoss}
              disabled={loading}
            >
              {loading ? "Sending..." : "I Lost"}
            </button>
          </div>
        </>
      ) : null}
      {step === "win" ? (
        <>
          <div className="confetti">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="label">Winner</p>
          <h2>Hand won</h2>
          <p className="subtle">Great play. The table will update shortly.</p>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </>
      ) : null}
      {step === "loss" ? (
        <>
          <p className="label">Result saved</p>
          <h2>Marked as loss</h2>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </>
      ) : null}
    </div>
  </div>
);

export default ShowdownModal;
