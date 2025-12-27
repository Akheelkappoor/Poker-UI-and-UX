import { Amount } from "../Amount";

const TablePotPanel = ({ pot }) => (
  <article className="card">
    <div className="inner">
      <h2>Table Pot</h2>
      <div className="gauge" aria-label="Pool total">
        <div className="gaugeContent">
          <div className="small">Pool Total</div>
          <div className="gaugeAmount">
            <Amount value={pot} size="xl" />
          </div>
          <div className="foot">No player balances displayed</div>
        </div>
      </div>
    </div>
  </article>
);

export default TablePotPanel;
