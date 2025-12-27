import { Amount } from "../Amount";

const StackPanel = ({ stack, walletBalance, totalBet, minPlayerBet, maxPlayerBet }) => (
  <article className="card">
    <div className="inner">
      <h2>Your Stack</h2>
      <div className="stackTop">
        <div className="big">
          <Amount value={stack} size="lg" />
        </div>
        <div className="tag">Available</div>
      </div>
      <div className="kv">
        <div className="kvRow">
          <span>Wallet balance</span>
          <b>
            <Amount value={walletBalance} size="sm" />
          </b>
        </div>
        <div className="kvRow">
          <span>Your total bet</span>
          <b>
            <Amount value={totalBet} size="sm" />
          </b>
        </div>
        <div className="kvRow">
          <span>Limits</span>
          <b>
            Min <Amount value={minPlayerBet} size="sm" /> · Max{" "}
            <Amount value={maxPlayerBet} size="sm" />
          </b>
        </div>
      </div>
    </div>
  </article>
);

export default StackPanel;
