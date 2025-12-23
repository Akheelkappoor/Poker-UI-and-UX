import { Amount } from "../Amount";

const StackPanel = ({ stack, walletBalance, totalBet, minPlayerBet, maxPlayerBet }) => (
  <div className="panel">
    <h2>Your Stack</h2>
    <div className="stack">
      <strong>
        <Amount value={stack} size="lg" />
      </strong>
      <span className="label">Available</span>
    </div>
    <p className="label">
      Wallet balance: <Amount value={walletBalance} size="sm" />
    </p>
    <p className="label">
      Your total bet: <Amount value={totalBet} size="sm" />
    </p>
    <p className="label">
      Min <Amount value={minPlayerBet} size="sm" /> · Max{" "}
      <Amount value={maxPlayerBet} size="sm" />
    </p>
  </div>
);

export default StackPanel;
