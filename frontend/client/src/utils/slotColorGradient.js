export default function getHeatmapColor(sizeMB) {
  if (sizeMB === 0) return "rgb(255, 0, 0)"; // corrupted
  return "rgb(0, 200, 0)"; // downloaded
}