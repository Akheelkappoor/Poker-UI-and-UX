import InfoPage from "./InfoPage";

const sections = [
  {
    heading: "Common Fixes",
    items: [
      "Wrong address: retry with the correct wallet.",
      "Room not found: verify the room code.",
      "Buttons stuck: refresh and rejoin the room.",
    ],
  },
  {
    heading: "Network Tips",
    items: [
      "Ensure you are on the same Wi-Fi network.",
      "Use the local server URL from the host.",
      "If API fails, check backend status.",
    ],
  },
  {
    heading: "Need Help",
    items: [
      "Ask the host to restart the room.",
      "Re-enter your name exactly as created.",
      "If still blocked, clear local storage and retry.",
    ],
  },
];

const SupportPage = () => (
  <InfoPage
    title="Support"
    subtitle="Quick fixes to keep your table running."
    sections={sections}
  />
);

export default SupportPage;
