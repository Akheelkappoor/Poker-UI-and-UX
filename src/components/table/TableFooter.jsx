const TableFooter = ({ handleLeave, leaveLoading }) => (
  <div className="foot-actions">
    {leaveLoading ? <div className="loading-bar" /> : null}
    <button
      className="btn btn-secondary"
      onClick={handleLeave}
      disabled={leaveLoading}
    >
      {leaveLoading ? "Leaving..." : "Leave Table"}
    </button>
  </div>
);

export default TableFooter;
