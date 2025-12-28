const InfoPage = ({ title, subtitle, sections }) => (
  <div className="app info-page">
    <div className="top-bar">
      <div className="brand">
        <h1>
          <span className="brand-white">MANO</span>
          <span className="brand-gold">Money</span>
        </h1>
        <p>{subtitle}</p>
      </div>
    </div>

    <div className="info-card">
      <h2>{title}</h2>
      <div className="info-grid">
        {sections.map((section) => (
          <div className="info-panel" key={section.heading}>
            <h3>{section.heading}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default InfoPage;
