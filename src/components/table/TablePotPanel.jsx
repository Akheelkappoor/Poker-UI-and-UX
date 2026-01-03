import { Amount } from "../Amount";

const TablePotPanel = ({ pot }) => (
  <article className="card pot-card">
    <div className="inner">
      <h2>Table Pot</h2>
      <div className="gauge" aria-label="Pool total">
        <div className="gaugeContent">
          <div className="gaugeAmount">
            <Amount value={pot} size="xl" />
          </div>
        </div>
      </div>
    </div>
  </article>
);

export default TablePotPanel;
