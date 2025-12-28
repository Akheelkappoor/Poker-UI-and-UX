import InfoPage from "./InfoPage";

const sections = [
  {
    heading: "Buy-In Limits",
    items: [
      "Host sets min and max per player.",
      "Wallet balance must meet the max limit to start.",
      "No player balances are displayed publicly.",
    ],
  },
  {
    heading: "Betting Flow",
    items: [
      "Bet only when no active bet exists.",
      "Call matches the current bet.",
      "Raise increases the current bet.",
    ],
  },
  {
    heading: "Round Progression",
    items: [
      "All players must match bets before next round.",
      "Ready for Next only counts when action is settled.",
      "Showdown happens after the final round.",
    ],
  },
];

const HouseRulesPage = () => (
  <InfoPage
    title="House Rules"
    subtitle="Simple rules for fair play at the table."
    sections={sections}
  />
);

export default HouseRulesPage;
