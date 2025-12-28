import InfoPage from "./InfoPage";

const sections = [
  {
    heading: "Create Or Join",
    items: [
      "Create a room and add player names.",
      "Share the room code with your table.",
      "Join a room with the same name the host entered.",
    ],
  },
  {
    heading: "Wallet Setup",
    items: [
      "Enter your wallet address for settlement.",
      "Addresses are validated by the backend.",
      "Wrong address keeps you in the room setup.",
    ],
  },
  {
    heading: "Money Flow",
    items: [
      "Pool totals are visible, individual balances are hidden.",
      "Buy-in limits are set by the host for each game.",
      "Settlement uses the table’s blockchain wallet after showdown.",
    ],
  },
  {
    heading: "Table Rules",
    items: [
      "Follow the host’s betting rules for the table.",
      "Ready for Next advances to the next hand once all are ready.",
      "Players who are not ready will be shown on the table.",
    ],
  },
];

const HowItWorksPage = () => (
  <InfoPage
    title="How It Works"
    subtitle="Quick setup, clear actions, smooth table flow."
    sections={sections}
  />
);

export default HowItWorksPage;
