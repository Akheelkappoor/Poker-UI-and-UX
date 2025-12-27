const FeedPanel = ({ feed }) => (
  <article className="card">
    <div className="inner">
      <h2>Table Feed</h2>
      <div className="feed">
        {feed.map((item, index) => (
          <div className="feedItem" key={`${item.label}-${index}`}>
            <b>{item.label}</b>
            <span>{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  </article>
);

export default FeedPanel;
