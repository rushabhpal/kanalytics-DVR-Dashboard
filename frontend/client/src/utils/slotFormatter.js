export default function formatSlot(rawSlot) {
  // e.g. "000000-020000" → "00:00-02:00"
  const [start, end] = rawSlot.split("-");
  const formatTime = (t) => t.slice(0, 2) + ":" + t.slice(2, 4);
  return `${formatTime(start)}-${formatTime(end)}`;
}