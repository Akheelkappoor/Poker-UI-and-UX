import { Amount } from "../Amount";

const TablePotPanel = ({ pot }) => (
  <div className="panel">
    <h2>Table Pot</h2>
    <div className="table-visual">
      <div className="label">Pool total</div>
      <div className="pot-total">
        <Amount value={pot} size="xl" />
      </div>
      <div className="label">No player balances displayed</div>
    </div>
  </div>
);

export default TablePotPanel;
