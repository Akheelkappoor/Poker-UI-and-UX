import manoCoin from "../assets/Mano_Coin.svg";

const ErrorPage = ({ code, title, message }) => (
  <div className="error-page">
    <div className="error-card">
      <img className="coin-hero" src={manoCoin} alt="Mano Coin" />
      <h1>{code}</h1>
      <p className="error-title">{title}</p>
      <p className="error-message">{message}</p>
      <button className="btn btn-primary" onClick={() => window.location.assign("/")}>
        Back to Lobby
      </button>
    </div>
  </div>
);

export default ErrorPage;
