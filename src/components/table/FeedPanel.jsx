const FeedPanel = ({ feed }) => (
  <div className="panel">
    <h2>Table Feed</h2>
    <div className="feed">
      {feed.map((item, index) => (
        <div className="feed-item" key={`${item.label}-${index}`}>
          <span className="feed-name">{item.label}</span>
          <span className="label">{item.detail}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FeedPanel;
